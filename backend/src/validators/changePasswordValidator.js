import { check, validationResult } from "express-validator";
import passwordValidator from "./helpers/passwordValidation.js";


export const validatePassword = [
  passwordValidator(),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawne haslo!" });
    }
    next();
  },
];
