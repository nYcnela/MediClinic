import { check } from "express-validator";

const emailValidator = (field) => {
  return check(field)
    .notEmpty()
    .withMessage("Nie wprowadzono email'a!")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .withMessage("Wprowadzony email nie jest poprawny!");
};

export default emailValidator;
