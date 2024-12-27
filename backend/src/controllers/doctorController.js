import {
  registerDoctorTransaction,
  fetchDoctorSpecializations,
  fetchDoctorBySpecializations,
  fetchAllDoctors,
  fetchDoctor,
  fetchDoctorDegree,
  fetchWorkDays,
  addWorkDay,
  updateWorkDay,
  deleteWorkDay,
  fetchWorkHours,
} from "../Repositories/doctorRepository.js";
import { findUserById } from "../Repositories/userRepository.js";
import { formatPhoneNumber } from "../utils/formatters.js";
import { generatePassword } from "../utils/generators.js";
import { hashPassword } from "../utils/hashing.js";
import { getBirthDateFromPESEL, getGenderFromPESEL } from "../utils/peselUtils.js";
import { transformWorkDays, transformWorkHours } from "../utils/transformWorkDays.js";
import { findUserByPesel } from "../Repositories/userRepository.js";
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
  const { name, surname, pesel, email, phoneNumber: fullPhoneNumber, pwz, degree, specialization, workDays, workHours } = req.body;

  const user = await findUserByPesel(pesel);
  if (user !== undefined) return res.status(400).json({ message: "Podany uzytkownik juz istnieje" });

  try {
    const { dialingCode, phoneNumber } = formatPhoneNumber(fullPhoneNumber);

    const birthDay = getBirthDateFromPESEL(pesel);
    const sex = getGenderFromPESEL(pesel);

    const password = generatePassword();
    const hashedPassword = await hashPassword(password);

    const userData = {
      name,
      surname,
      pesel,
      email,
      dialingCode,
      phoneNumber,
      sex,
      birthDay,
      password: hashedPassword,
    };

    const doctorData = {
      pwz,
      degree,
    };

    const specializations = [...specialization];

    const response = await registerDoctorTransaction(userData, doctorData, specializations, workDays, workHours);
    console.log(`GENERATED TEMPORARY PASSWORD FOR DOCTOR ACCOUNT: ${chalk.yellow(password)}`);

    return res.status(200).json({
      message: "Konto zostało pomyślnie utworzone",
      temporaryPassword: `Tymczasowe hasło do konta: ${password}`,
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(400).json({ message: "Błąd podczas tworzenia konta!" });
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
    const specializations = (await fetchDoctorSpecializations(unique)).map((specialization) => ({
      value: specialization.id,
      label: specialization.label,
    }));
    if (specializations.length > 0) {
      return res.status(200).json({ specializations: specializations });
    } else {
      return res.status(200).json({ message: "No specializatons found" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Blad podczas pobierania specjalizacji lekrzy",
    });
  }
};

export const getDoctorBySpecializations = async (req, res) => {
  try {
    const { specializationName: specialization } = req.params;
    const allDegrees = await fetchDoctorDegree();
    const doctors = (await fetchDoctorBySpecializations(specialization)).map((doctor) => ({
      value: doctor.id,
      label: allDegrees.find((degree) => degree.id === doctor.degree_id).value + " " + doctor.name + " " + doctor.surname,
    }));
    if (doctors.length === 0) {
      return res.status(404).json({ message: "Doktorzy z podana specjalizacja nie istnieja" });
    }
    return res.status(200).json({ doctors: doctors });
  } catch (error) {
    return res.status(500).json({ message: "Blad podczas pobierania doktorow wyszukujac po specjalizacji" });
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
    const allDegrees = await fetchDoctorDegree();
    const doctors = (await fetchAllDoctors()).map((doctor) => ({
      value: doctor.id,
      label: allDegrees.find((degree) => degree.id === doctor.degree_id).value + " " + doctor.name + " " + doctor.surname,
    }));
    if (doctors.length > 0) {
      return res.status(200).json({ doctors: doctors });
    } else {
      return res.status(200).json({ message: "Nie znaleziono doktorow" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Blad podczas pobierania doktorow" });
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
    const fetchSpecializations = req.query.specializations ? true : false;
    const allDegrees = await fetchDoctorDegree();

    const { id, degree_id, name, surname, specializations } = await fetchDoctor(doctorId, fetchSpecializations);
    if (id === undefined) return res.status(404).json({ message: "Specjalista z takim id nie istnieje!" });

    let doctorData = { value: id, label: allDegrees.find((degree) => degree.id === degree_id).value + " " + name + " " + surname };
    if (!!specializations) doctorData = { ...doctorData, specializations: specializations };
    // console.log(doctorData);
    // console.log(schedule);
    if (!!doctorData) {
      return res.status(200).json({ doctor: doctorData });
    } else {
      return res.status(404).json({ message: "Doktor z podanym id nie istnieje" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Blad podczas pobierania doktora" });
  }
};

export const getDoctorDegree = async (req, res) => {
  try {
    const degrees = await fetchDoctorDegree();
    return res.status(200).json({ degrees: degrees });
  } catch {
    console.log("Error getting doctors' degree");
    return res.status(500).json({ message: "Blad podczas pobierania tytulow doktorow" });
  }
};

export const updateWorkHours = async (req, res) => {
  try {
    const { id: doctorId } = req.params;
    const { workDays, workHours } = req.body;

    const user = await findUserById(doctorId);
    if (user === undefined) return res.status(404).json({ message: "Nie znaleziono uzytkownika!" });
    else if (user.role !== "doctor") return res.status(404).json({ message: "Podany uzytkownik nie moze miec zmienionych godzin pracy" });

    const oldWorkDays = (await fetchWorkDays(doctorId)).map((day) => day.work_day);
    const newWorkDays = workDays.map((day) => day.value);
    // console.log("stare dni pracy doktora: ", oldWorkDays);
    // console.log("nowe dni pracy doktora: ", newWorkDays);

    for (const day of oldWorkDays) {
      if (!newWorkDays.includes(day)) {
        // console.log("usuwany dzien: ", day);
        const deleted = await deleteWorkDay(doctorId, day);
      }
    }

    for (const day of newWorkDays) {
      // console.log(chalk.yellow(day));
      if (oldWorkDays.includes(day)) {
        const { start: startTime, end: endTime } = workHours[day];
        // console.log("dane do update'u", doctorId, day, startTime, endTime);
        const updated = await updateWorkDay(doctorId, day, startTime, endTime);
      } else {
        const { start: startTime, end: endTime } = workHours[day];
        // console.log("dane do dodanie", doctorId, day, startTime, endTime);
        const added = await addWorkDay(doctorId, day, startTime, endTime);
      }
    }
    return res.status(200).json({ message: "Harmonogram zostal zmieniony" });
  } catch (error) {
    console.log("Error updating doctor's work hours", error.message);
    return res.status(500).json({ message: "Blad podczas aktualizowania godzin pracy doktora" });
  }
};

export const getDoctorWorkHours = async (req, res) => {
  const { id: doctorId } = req.params;
  try {
    const workDays = await fetchWorkDays(doctorId);
    const formattedWorkDays = transformWorkDays(workDays);
    let daysHours = await fetchWorkHours(doctorId);
    daysHours = transformWorkHours(daysHours);
    return res.status(200).json({ workDays: formattedWorkDays, workHours: daysHours });
  } catch (error) {
    console.log("Error getting doctor's work hours", error.message);
    return res.status(500).json({ message: "Blad podczas pobierania godzin pracy doktora" });
  }
};
