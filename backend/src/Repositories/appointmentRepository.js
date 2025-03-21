import db from "../config/dbConnection.js";

export const createNewAppointment = async (client, doctorId, userId, appointmentTime) => {
  try {
    const query = "INSERT INTO appointments (doctor_id, user_id, appointment_time) VALUES ($1, $2, $3) RETURNING id";
    const response = await client.query(query, [doctorId, userId, appointmentTime]);
    return response.rows[0];
  } catch (error) {
    console.log("Error creating new transaction ", error.message);
    throw error;
  }
};

export const createAppointmentTransaction = async (doctorId, userId, appointmentTime) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const checkQuery = "SELECT id FROM appointments WHERE doctor_id = $1 AND appointment_time = $2";
    const existingAppointment = await client.query(checkQuery, [doctorId, appointmentTime]);

    if (existingAppointment.rows.length > 0) {
      throw new Error("Appointment is already taken");
    }

    const { id: appointmentId } = await createNewAppointment(client, doctorId, userId, appointmentTime);
    if (!appointmentId) throw new Error("Appointment creation failed");

    await client.query("COMMIT");
    return appointmentId;
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Error creating appointment");
    throw error;
  } finally {
    client.release();
  }
};

export const fetchWorkSchedule = async (doctorId) => {
  const client = await db.connect();
  try {
    const query = "SELECT doctor_id, work_day, start_time, end_time, appointment_interval FROM doctor_work_schedule WHERE doctor_id = $1";
    const response = await client.query(query, [doctorId]);
    return response.rows;
  } catch (error) {
    console.log("Error selecting schedule informations");
    throw error;
  } finally {
    client.release();
  }
};

export const fetchAppointment = async (id, start_date, end_date) => {
  end_date = end_date ?? start_date;
  const client = await db.connect();
  try {
    const query = "SELECT * FROM appointments WHERE appointment_time BETWEEN $1 AND $2 AND doctor_id = $3";
    const response = await client.query(query, [start_date, end_date, id]);
    return response.rows;
  } catch (error) {
    console.log("Error selecting appointments with provided date");
  } finally {
    client.release();
  }
};

export const fetchAppointmentById = async (appointmentId) => {
  const client = await db.connect();
  try {
    const query = "SELECT id, doctor_id, user_id, appointment_time from appointments WHERE id = $1";
    const response = await client.query(query, [appointmentId]);
    // console.log("z bazki: ", response.rows);
    return response.rows;
  } catch (error) {
    console.log("Error selecting appointment by id");
  } finally {
    client.release();
  }
};

export const fetchAppointmentByDate = async (appointment_time, docotrId = null) => {
  const client = await db.connect();
  try {
    let query;
    let response;
    if (!!docotrId) {
      query = "SELECT id, doctor_id, user_id, appointment_time from appointments WHERE appointment_time = $1 AND doctor_id = $2";
      response = await client.query(query, [appointment_time, docotrId]);
    } else {
      query = "SELECT id, doctor_id, user_id, appointment_time from appointments WHERE appointment_time = $1";
      response = await client.query(query, [appointment_time]);
    }
    return response.rows;
  } catch (error) {
    console.log("Error selecting appointment by appointment time");
    throw error;
  } finally {
    client.release();
  }
};

export const deleteAppointmentById = async (appointmentId) => {
  const client = await db.connect();
  try {
    const query = "DELETE FROM appointments WHERE id = $1";
    const response = await client.query(query, [appointmentId]);
    return response.rowCount;
  } catch (error) {
    console.log("Error deleting appointment with provided id", error.message);
    throw error;
  } finally {
    client.release();
  }
};

export const fetchUserAppointments = async (date, userId, time) => {
  const client = await db.connect();
  try {
    const operator = time === "future" ? ">=" : "<";
    const query = `SELECT a.id AS appointment_id, a.appointment_time, u.id AS user_id, u.name AS user_name, u.surname AS user_surname, d.id AS doctor_id, d.user_id AS doctor_user_id, du.name AS doctor_name, du.surname AS doctor_surname, d.pwz AS doctor_pwz, dd.value AS doctor_degree FROM appointments a JOIN doctors d ON a.doctor_id = d.user_id JOIN users u ON a.user_id = u.id JOIN users du ON d.user_id = du.id LEFT JOIN doctor_degree dd ON d.degree_id = dd.id WHERE a.user_id = $1 AND a.appointment_time ${operator} $2;`;
    const response = await client.query(query, [userId, date]);
    // console.log(response.rows);
    return response.rows;
  } catch (error) {
    console.log(`Error selecting ${time === "future" ? "future" : "past"} appointments with provided date and user id`, error.message);
    throw error;
  } finally {
    client.release();
  }
};
