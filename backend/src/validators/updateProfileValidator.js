import { check, validationResult } from "express-validator";
import emailValidator from "./helpers/emailValidation.js";
import phoneNumberValidator from "./helpers/phoneNumberValidator.js";


export const validateEmailAndPhoneNumber = [
  emailValidator("email"),

  phoneNumberValidator(),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawne dane do edytowania!" });
    }
    next();
  },
];
