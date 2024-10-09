import db from "../config/dbConnection.js";

export const createNewAppointment = async (client, doctorId, userId, appointmentTime) => {
  try {
    const query = "INSERT INTO appointments (doctor_id, user_id, appointment_time) VALUES ($1, $2, $3) RETURNING id";
    const response = await client.query(query, [doctorId, userId, appointmentTime]);
    // console.log("1", response.rows[0]);
    //1 { id: 16 }
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

export const deleteAppointmentById = async (appointmentId) => {
  const client = await db.connect()
  try{
    const query = "DELETE FROM appointments WHERE id = $1"
    const response = await client.query(query, [appointmentId])
    return response.rowCount
  }catch(error){
    console.log("Error deleting appointment with provided id", error.message);
    throw error
  }finally{
    client.release()
  }
}