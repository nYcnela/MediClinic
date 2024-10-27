import { check, validationResult } from "express-validator";
import { isPeselValid } from "../utils/peselValidation.js";

export const validateLogin = [
  //email to username
  check("username")
    .notEmpty()
    .withMessage("Nie wprowadzono email'a!")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .withMessage("Wprowadzony email nie jest poprawny!"),

  check("password")
    .notEmpty()
    .withMessage("Nie wprowadzono hasla!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage("Wprowadzone hasło nie jest poprawne!"),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawne dane logowania!" });
    }
    next();
  },
];

export const validateRegister = [
  check("name")
    .notEmpty()
    .withMessage("Wprowadz imie!")
    .matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)
    .withMessage("Pole moze zawierac tylko litery!")
    .isLength({ min: 2 })
    .withMessage("Imie musi skladac sie z wiecej niz jednej litery!"),

  check("surname")
    .notEmpty()
    .withMessage("Wprowadz nazwisko!")
    .matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)
    .withMessage("Pole moze zawierac tylko litery!")
    .isLength({ min: 2 })
    .withMessage("Nazwisko musi skladac sie z wiecej niz jednej litery!"),

  check("pesel")
    .notEmpty()
    .withMessage("Wprowadz pesel!")
    .isLength({ min: 11, max: 11 })
    .withMessage("Wprowadzony pesel nie jest poprawny!")
    .matches(/^\d+$/)
    .withMessage("Wprowadzony pesel zawiera inne znaki niż cyfry!")
    .custom((pesel) => {
      if (!isPeselValid(pesel)) {
        throw new Error("Wprowadzony pesel nie jest poprawny!");
      }
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Nie wprowadzono email'a!")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .withMessage("Wprowadzony email nie jest poprawny!"),

  check("phoneNumber")
    .notEmpty()
    .withMessage("Wprowadz numer telefonu!")
    .isLength({ min: 9, max: 13 })
    .withMessage("Wprowadzony numer telefonu nie jest poprawny!"),

  check("password")
    .notEmpty()
    .withMessage("Nie wprowadzono hasla!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage("Wprowadzone hasło nie jest poprawne!"),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawne dane aby sie zarejestrowac!" });
    }
    next();
  },
];
