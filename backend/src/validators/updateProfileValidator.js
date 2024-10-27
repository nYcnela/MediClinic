import { check, validationResult } from "express-validator";

export const validateEmailAndPhoneNumber = [
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

  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Wprowadz poprawne dane do edytowania!" });
    }
    next();
  },
];
