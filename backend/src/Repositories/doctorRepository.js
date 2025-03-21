import db from "../config/dbConnection.js";
import { registerUserTransaction } from "./userRepository.js";

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
    const values = [userId, pwz, degree];
    const query = "INSERT INTO doctors (user_id, pwz, degree_id) VALUES ($1, $2, $3) RETURNING id";
    const result = await client.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.log("Error while adding values to the doctors table", error.message);
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
export const registerDoctorTransaction = async (userData, doctorData, specializations, workDays, workHours) => {
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

    const insertSpecializationsQuery = "INSERT INTO doctor_specializations (doctor_id, specialization_id) VALUES($1, $2)";

    for (const specialization of specializations) {
      // console.log(specialization);
      try {
        console.log("Doctor:" + userId, "specialization id: ", specialization.value);
        await client.query(insertSpecializationsQuery, [userId, `${specialization.value}`]);
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
    //todo
    // const insertDayOfWorkQuery = "INSERT INTO doctor_work_schedule (doctor_id, work_day, start_time, end_time) VALUES ($1, $2, $3, $4)";
    for (const dayOfWork of workDaysHoursMap) {
      try {
        const { day, startTime, endTime } = dayOfWork;
        await addWorkDay(userId, day, startTime, endTime, client);
        // await client.query(insertDayOfWorkQuery, [userId, day, startTime, endTime]);
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
    console.log("Error selecting specializations", error);
    throw error;
  } finally {
    client.release();
  }
};

export const fetchDoctorBySpecializations = async (specialization) => {
  const client = await db.connect();
  try {
    const query =
      "SELECT u.id, d.degree_id, u.name, u.surname FROM users AS u JOIN doctors AS d ON u.id = d.user_id JOIN doctor_specializations AS ds ON ds.doctor_id = d.user_id JOIN specializations AS sp ON sp.id = ds.specialization_id WHERE sp.name = $1";
    const response = await client.query(query, [specialization]);
    return response.rows;
  } catch (error) {
    console.log("Errror selecting doctor by specialization name", error);
    throw error;
  } finally {
    client.release();
  }
};

export const fetchDoctorBySpecializationId = async (id) => {
  const client = await db.connect();
  try {
    const query =
      "SELECT u.id, d.degree_id, u.name, u.surname FROM users AS u JOIN doctors AS d ON u.id = d.user_id JOIN doctor_specializations AS ds ON ds.doctor_id = d.user_id JOIN specializations AS sp ON sp.id = ds.specialization_id WHERE sp.id = $1";
    const response = await client.query(query, [id]);
    return response.rows;
  } catch (error) {
    console.log("Errror selecting doctor by specialization id", error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Fetches all doctors
 *
 * Each returned doctor includes their user ID, degree, first name, last name
 * @returns {Promise<Array<Object>>} a promise that resolves to an array of doctors
 */
export const fetchAllDoctors = async () => {
  const client = await db.connect();
  try {
    // "SELECT d.user_id AS id, d.degree AS label, u.name, u.surname FROM users as u JOIN doctors as d ON u.id = d.user_id WHERE u.role = 'doctor'";
    const query =
      "SELECT d.user_id AS id, d.degree_id, u.name, u.surname FROM users as u JOIN doctors as d ON u.id = d.user_id WHERE u.role = 'doctor'";
    const doctors = await client.query(query);
    return doctors.rows;
  } catch (error) {
    console.log("Error selecting all doctors");
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Fetches a specific doctor from the database by their user ID
 *
 * the returned doctor includes their user ID, degree, first name, last name
 * @param {number} doctorId - the unique ID of the doctor
 * @returns {Promise<Object|null>}
 */
export const fetchDoctor = async (doctorId, getSpecializations) => {
  const client = await db.connect();
  try {
    let response;
    const doctorQuery =
      "SELECT d.user_id AS id, d.degree_id, u.name, u.surname FROM users as u JOIN doctors as d ON u.id = d.user_id WHERE u.id = $1";
    const doctor = await client.query(doctorQuery, [doctorId]);
    response = { ...doctor.rows[0] };
    if (getSpecializations) {
      const specializationsQuery =
        "SELECT s.name FROM specializations AS s JOIN doctor_specializations AS ds ON s.id = ds.specialization_id WHERE ds.doctor_id = $1";
      const doctorSpeciazlizations = await client.query(specializationsQuery, [doctorId]);
      response = { ...response, specializations: doctorSpeciazlizations.rows };
    }
    return response;
  } catch (error) {
    console.log("Error selecting doctor by id: ", error);
    throw error;
  } finally {
    client.release();
  }
};

export const fetchDoctorDegree = async () => {
  const client = await db.connect();
  try {
    const query = "SELECT * FROM doctor_degree";
    const response = await client.query(query);
    // console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.log("Error fetching doctors' degree");
    throw error;
  } finally {
    client.release();
  }
};

export const fetchWorkDays = async (doctorId) => {
  const client = await db.connect();
  try {
    const query = "SELECT work_day FROM doctor_work_schedule WHERE doctor_id = $1";
    const response = await client.query(query, [doctorId]);
    return response.rows;
  } catch (error) {
    console.log("Error fetching doctor's work day", error.message);
    throw error;
  } finally {
    client.release();
  }
};

export const fetchWorkHours = async (doctorId) => {
  const client = await db.connect();
  try {
    const query = "SELECT work_day, start_time, end_time FROM doctor_work_schedule WHERE doctor_id = $1";
    const response = await client.query(query, [doctorId]);
    return response.rows;
  } catch (error) {
    console.log("Error fetching doctor's work hours", error.message);
    throw error;
  } finally {
    client.release();
  }
};

export const addWorkDay = async (doctorId, workDay, startTime, endTime, client = db) => {
  try {
    const query = "INSERT INTO doctor_work_schedule (doctor_id, work_day, start_time, end_time) VALUES ($1, $2, $3, $4)";
    const response = await client.query(query, [doctorId, workDay, startTime, endTime]);
    return response.rowCount;
  } catch (error) {
    console.log("Error adding doctor's work day", error.message);
    throw error;
  }
};

export const updateWorkDay = async (doctorId, workDay, startTime, endTime) => {
  const client = await db.connect();
  try {
    const query = "UPDATE doctor_work_schedule SET start_time = $3, end_time = $4 WHERE doctor_id = $1 AND work_day = $2";
    const response = await client.query(query, [doctorId, workDay, startTime, endTime]);
    return response.rowCount;
  } catch (error) {
    console.log("Error updating doctor's work day", error.message);
    throw error;
  } finally {
    client.release();
  }
};

export const deleteWorkDay = async (doctorId, workDay) => {
  const client = await db.connect();
  try {
    const query = "DELETE FROM doctor_work_schedule WHERE doctor_id = $1 AND work_day = $2";
    const response = await client.query(query, [doctorId, workDay]);
    return response.rowCount;
  } catch (error) {
    console.log("Error deleting doctor's work day", error.message);
    throw error;
  } finally {
    client.release();
  }
};
