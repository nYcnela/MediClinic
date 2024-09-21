import {
  registerDoctorTransaction,
  fetchDoctorSpecializations,
  fetchAllDoctors,
  fetchDoctor,
} from "../models/doctorModel.js";
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
 *@returns {void} sends a JSON response with a success message and temporary password on success or an error message on failure
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

/**
 * Handles the request to fetch specializations
 *
 * @param {Object} req - the HTTP request object, expected to containing query parameter "unique"
 * @returns {Promise<void>} sends a JSON response containing the fetched specializations or an error message
 */
export const fetchSpecializations = async (req, res) => {
  try {
    const unique = req.query.unique === "true";
    const specializations = await fetchDoctorSpecializations(unique);
    if (specializations.length > 0) {
      res.status(200).json({ specializations: specializations });
    } else {
      res.status(200).json({ message: "No specializatons found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching doctors' specializations",
    });
  }
};

/**
 * Handles the request to fetch all doctors
 *
 * If doctors are found it return an array of doctors, otherwise it returns a 200 status with a message  and an empty array
 *
 * @returns {void} sends a JSON response containing eiher a list of doctors or an empty list
 */
export const fetchDoctors = async (req, res) => {
  try {
    const doctors = await fetchAllDoctors();
    if (doctors.length > 0) {
      res.status(200).json({ doctors: doctors });
    } else {
      res.status(200).json({ message: "No doctors found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

/**
 * Handles the request to fetch a doctor by their ID
 *
 * ID doctor is found, it returns the doctor's details otherwise it returns a 404 status with a message
 * @return {void} sends a JSON response containing the doctor's details or an error message
 */
export const fetchDoctorById = async (req, res) => {
  const { id: doctorId } = req.params;
  try {
    const doctor = await fetchDoctor(doctorId);
    if (!!doctor) {
      res.status(200).json({ doctor: doctor });
    } else {
      res
        .status(404)
        .json({ message: "Doctor with provided id does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor" });
  }
};
