import { check, validationResult } from "express-validator";

export const validatePassword = [
  check("password")
    .notEmpty()
    .withMessage("Nie wprowadzono hasla!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage("Wprowadzone hasło nie jest poprawne!"),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawne haslo!" });
    }
    next();
  },
];
