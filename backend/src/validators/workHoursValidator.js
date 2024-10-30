import { check, validationResult } from "express-validator";
import workDaysValidator from "./helpers/workDaysValidation.js";
import workHoursValidator from "./helpers/workHoursValidation.js";

export const validateWorkHours = [
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
