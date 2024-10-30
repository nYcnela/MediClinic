import { check } from "express-validator";

export const nameValidator = () => {
  return check("name")
    .notEmpty()
    .withMessage("Wprowadz imie!")
    .matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)
    .withMessage("Pole moze zawierac tylko litery!")
    .isLength({ min: 2 })
    .withMessage("Imie musi skladac sie z wiecej niz jednej litery!");
};

export const surnameValidator = () => {
  return check("surname")
    .notEmpty()
    .withMessage("Wprowadz nazwisko!")
    .matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/)
    .withMessage("Pole moze zawierac tylko litery!")
    .isLength({ min: 2 })
    .withMessage("Nazwisko musi skladac sie z wiecej niz jednej litery!");
};
