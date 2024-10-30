import { check, validationResult } from "express-validator";
import emailValidator from "./helpers/emailValidation.js";
import peselValidator from "./helpers/peselValidation.js";
import phoneNumberValidator from "./helpers/phoneNumberValidator.js";
import workDaysValidator from "./helpers/workDaysValidation.js";
import workHoursValidator from "./helpers/workHoursValidation.js";
import degreeValidator from "../validators/helpers/degreeValidation.js";
import specializationValidator from "../validators/helpers/specializationValidaton.js";
import { nameValidator, surnameValidator } from "./helpers/nameValidators.js";

export const validateDoctorForm = [
  nameValidator(),

  surnameValidator(),

  peselValidator(),

  emailValidator("email"),

  phoneNumberValidator(),

  check("pwz")
    .notEmpty()
    .withMessage("Numer pwz nie moze byc pusty!")
    .isLength({ min: 7, max: 7 })
    .withMessage("Dlugosc numeru pwz musi byc rowna 7!")
    .isNumeric()
    .withMessage("Numer pwz moze zawierac tylko cyfry!"),

  degreeValidator(),

  specializationValidator(),

  workDaysValidator(),

  workHoursValidator(),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawne dane!" });
    }
    next();
  },
];
