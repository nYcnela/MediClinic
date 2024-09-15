import { registerDoctorTransaction } from "../models/doctorModel.js";
import { formatPhoneNumber } from "../utils/formatters.js";
import { generatePassword } from "../utils/generators.js";
import { hashPassword } from "../utils/hashing.js";
import chalk from "chalk";

/**
 * Adds a new doctor to the system by registering their data in multiple tables:
 * users, doctors, doctors_specializatons, work_time_records
 *
 * Funtion extracts relevant data from the request body, formats it, generates a temporaty password,
 * hashes it and inserts the data transactionally
 *
 * @param {Object} req - the HTTP request object, expected to contain:
 * @param {string} req.body.name - doctor's first name
 * @param {string} req.body.surname - doctor's last name
 * @param {string} req.body.pesel - doctor's PESEL number
 * @param {string} req.body.email - doctor's email adress
 * @param {string} req.body.phoneNumber doctor's full phone number, including dialing code
 * @param {string} req.body.pwz = doctor's medical license number
 * @param {string} req.body.sex - doctor's gender
 * @param {string} req.body.degree - doctor's degree
 * @param {Array} req.body.specialization - list of doctor's specializations [{ label: string, value: string }, ...]
 * @param {Array} req.body.workDays - days the doctor works [{ value: string, label: string }, ...]
 * @param {Object} req.body.workHours - work hours for each day { day: { start: string, end: string }, ... }
 *
 *@returns { void } sends a JSON response with a success message and temporary password on success or an error message on failure
 */
export const addDoctor = async (req, res) => {
  // console.log(req.body);
  const {
    name,
    surname,
    pesel,
    email,
    phoneNumber: fullPhoneNumber,
    pwz,
    sex,
    degree,
    specialization,
    workDays,
    workHours,
  } = req.body;
  try {
    const { dialingCode, phoneNumber } = formatPhoneNumber(fullPhoneNumber);

    const password = generatePassword();
    const hashedPassword = await hashPassword(password);

    const userData = {
      name,
      surname,
      pesel,
      email,
      dialingCode,
      phoneNumber,
      password: hashedPassword,
    };

    const doctorData = {
      pwz,
      sex,
      degree,
    };

    const specializations = [...specialization];

    const response = await registerDoctorTransaction(
      userData,
      doctorData,
      specializations,
      workDays,
      workHours
    );
    console.log(
      `GENERATED TEMPORARY PASSWORD FOR DOCTOR ACCOUNT: ${chalk.yellow(
        password
      )}`
    );

    res.status(200).json({
      message: "Konto zostało pomyślnie utworzone",
      temporaryPassword: `Tymczasowe hasło do konta: ${password}`,
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(400).json({ message: "Błąd podczas tworzenia konta!" });
  }
};
