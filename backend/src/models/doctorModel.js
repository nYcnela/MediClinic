import db from "../config/dbConnection.js";
import { registerUserTransaction } from "./userModel.js";

/**
 * Creates a new doctor entry in the doctors table
 *
 * @param {Object} doctorData  Doctor-specific data {userId: number, pwz: string, sex: string, degree: string }
 * @param {Object} client  The database connection client used to execute the query within transaction
 * @returns {Promise<number>} Returns created doctor's ID, returns -1 if an error occurs
 */
export const createNewDoctor = async (doctorData, client) => {
  const { userId, pwz, sex, degree } = doctorData;
  try {
    const values = [userId, pwz, sex, degree];
    const query =
      "INSERT INTO doctors (user_id, pwz, sex, degree) VALUES ($1, $2, $3, $4) RETURNING id";
    const result = await client.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.log(
      "Error while adding values to the doctors table",
      error.message
    );
    return -1;
  }
};

/**
 * Registers a doctor with all necessary informations in users, doctors, doctor_specializations, and work_time_records tables
 *
 * Function to register a doctor transactionally
 * @param {Object} userData - Basic user data for the doctor {name: string, surname: string, pesel: string, email: string, dialingCode: string, phoneNumber: string, password: string}
 * @param {Object} doctorData - Additional doctor-specific data { pwz: string, sex: string, degree: string }
 * @param {Array} specializations - List of doctor's specializations [{ label: string, value: string }, ...]
 * @param {Array} workDays - Days the doctor works [{ value: string, label: string }, ...]
 * @param {Object} workHours - Work hours for each day {tuesday: { start: '08:00', end: '09:00' }, ...}
 * @returns {Promise<number>} Returns created doctor's ID, returns -1 if an error occurs
 */
export const registerDoctorTransaction = async (
  userData,
  doctorData,
  specializations,
  workDays,
  workHours
) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const userId = await registerUserTransaction(userData, "doctor", client);
    if (!userId) {
      throw new Error("User creation failed (registerDoctorTransaction)");
    }

    const fullDoctorData = { userId, ...doctorData };
    const doctorId = await createNewDoctor(fullDoctorData, client);
    if (!doctorId) {
      throw new Error("Doctor creation failed (registerDoctorTransaction)");
    }

    const insertSpecializationsQuery =
      "INSERT INTO doctor_specializations (doctor_id, specialization_id) VALUES($1, $2)";

    for (const specialization of specializations) {
      // console.log(specialization);
      try {
        await client.query(insertSpecializationsQuery, [
          userId,
          `${specialization.value}`,
        ]);
      } catch (error) {
        throw new Error("Failed to insert specialization");
      }
    }

    const workDaysHoursMap = workDays.map(({ value }) => {
      return {
        day: value,
        startTime: workHours[value].start,
        endTime: workHours[value].end,
      };
    });

    const insertDayOfWorkQuery =
      "INSERT INTO work_time_records (employee_id, work_day, start_time, end_time) VALUES ($1, $2, $3, $4)";
    for (const dayOfWork of workDaysHoursMap) {
      try {
        const { day, startTime, endTime } = dayOfWork;
        await client.query(insertDayOfWorkQuery, [
          userId,
          day,
          startTime,
          endTime,
        ]);
      } catch (error) {
        throw new Error("Failed to insert work day");
      }
    }

    await client.query("COMMIT");
    return userId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Fetches all specliazations or unique speciliazations assigned to doctors
 *
 * Depending on the value of the "unique" parameter this function returns either:
 * -All available specializations in the database when "unique" is "false"
 * -Unique specializations assigned to doctors when "unique" is "true"
 *
 * @param {boolean} [unique = false] - if "true" returns distinct specializations assigned to doctors. if "false" returns all available specializations
 * @returns {Promise<Array<Object>>} a promise that resolves to an array of specializations, each with "id" and a "label"
 */
export const fetchDoctorSpecializations = async (unique = false) => {
  const client = await db.connect();
  try {
    let query;
    if (unique) {
      query =
        "SELECT DISTINCT spec.id, spec.name AS label FROM doctor_specializations AS doctor_s JOIN specializations AS spec ON doctor_s.specialization_id = spec.id";
    } else {
      query = "SELECT id, name AS label FROM specializations";
    }
    const response = await client.query(query);
    return response.rows;
  } catch (error) {
    console.log("Error geting specializations", error);
    throw error;
  } finally {
    client.release();
  }
};
