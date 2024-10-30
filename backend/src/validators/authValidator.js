import { check, validationResult } from "express-validator";
import peselValidator  from "./helpers/peselValidation.js";
import emailValidator from "./helpers/emailValidation.js";
import phoneNumberValidator from "./helpers/phoneNumberValidator.js";
import passwordValidator from "./helpers/passwordValidation.js";
import { nameValidator, surnameValidator } from "./helpers/nameValidators.js";

export const validateLogin = [
  //username to email
  emailValidator("username"),

  passwordValidator(),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Wprowadz poprawne dane logowania!" });
    }
    next();
  },
];

export const validateRegister = [
  nameValidator(),

  surnameValidator(),

  peselValidator(),

  emailValidator("email"),

  phoneNumberValidator(),

  passwordValidator(),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Wprowadz poprawne dane aby sie zarejestrowac!" });
    }
    next();
  },
];
