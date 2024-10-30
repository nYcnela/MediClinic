import { check } from "express-validator";

const isPeselValid = (pesel) => {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += parseInt(pesel[i]) * weights[i];
  }

  const controlDigit = (10 - (sum % 10)) % 10;
  return controlDigit === parseInt(pesel[10]);
};

const peselValidator = () => {
  return check("pesel")
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
    });
};

export default peselValidator;