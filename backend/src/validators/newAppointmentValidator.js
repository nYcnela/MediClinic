import { validationResult } from "express-validator";
import appointmentUserValidator from "./helpers/userValidator.js";
import futureDateValidator from "./helpers/dateValidator.js";

export const validateNewAppointment = [
  appointmentUserValidator("doctorId", "doctor"),

  appointmentUserValidator("userId", "user"),

  futureDateValidator(),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Wprowadz poprawne dane dla wizyty!" });
    }
    next();
  },
];

export default validateNewAppointment;