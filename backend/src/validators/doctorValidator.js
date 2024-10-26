import { check, validationResult } from "express-validator";
import { isPeselValid } from "../utils/peselValidation.js";
import { isSpecializationValid } from "../utils/specializationValidaton.js";
import { isDegreeValid } from "../utils/degreeValidation.js";

export const validateDoctorForm = [
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

  check("pwz")
    .notEmpty()
    .withMessage("Numer pwz nie moze byc pusty!")
    .isLength({ min: 7, max: 7 })
    .withMessage("Dlugosc numeru pwz musi byc rowna 7!")
    .isNumeric()
    .withMessage("Numer pwz moze zawierac tylko cyfry!"),

  check("degree")
    .custom(async (degree) => {
      const isValid = await isDegreeValid(degree);
      if (!isValid) {
        throw new Error("Wprowadzono niepoprawny stopien naukowy!");
      }
      return true;
    })
    .withMessage("Wprowadzono niepoprawny stopien naukowy!"),

  check("specialization")
    .custom(async (specializationsArr) => {
      for (const specialization of specializationsArr) {
        const isValid = await isSpecializationValid(specialization.value);
        if (!isValid) {
          throw new Error("Podano niepoprawna specjalizacje!");
        }
      }
      return true;
    })
    .withMessage("Podano niepoprawna specjalizacje!"),

  check("workDays")
    .custom((workDays) => {
      const validDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      return workDays.every((day) => validDays.includes(day.value));
    })
    .withMessage("Nie wprowadzono poprawnego dnia pracy"),

  check("workHours")
    .custom((workHours) => {
      for (const day in workHours) {
        const { start, end } = workHours[day];
        if (start && !/^\d{2}:\d{2}$/.test(start)) return false;
        if (end && !/^\d{2}:\d{2}$/.test(end)) return false;
      }
      return true;
    })
    .withMessage("Niepoprawny format wprowadzonych godzin pracy"),

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawne dane!" });
    }
    next();
  },
];
