import { check, validationResult } from "express-validator";
import { dateValidator } from "../validators/helpers/dateValidator.js";

export const validateDate = (field = "date") => [
  dateValidator(field),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawna date!" });
    }
    next();
  },
];
