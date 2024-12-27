import { check } from "express-validator";
import { findUserById } from "../../Repositories/userRepository.js";
import { fetchDoctor } from "../../Repositories/doctorRepository.js";

const appointmentUserValidator = (idField, role) => {
  return check(idField)
    .notEmpty()
    .withMessage("Nie podano id uzytkownika")
    .isNumeric()
    .withMessage("id musi byc liczba")
    .custom(async (id) => {
      let userExists;

      if (role === "user") {
        userExists = await findUserById(id);
      } else if (role === "doctor") {
        userExists = await fetchDoctor(id);
      } else {
        return false;
      }
      //   console.log("walidator", userExists);
      if (userExists === undefined || Object.keys(userExists).length === 0) {
        return Promise.reject(role === "user" ? "Nie znaleziono uzytkownika o podanym id" : "Nie znaleziono doktora o podanym id");
      }

      return true;
    });
};

export default appointmentUserValidator;
