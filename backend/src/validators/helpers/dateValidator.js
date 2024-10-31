import { check } from "express-validator";

const futureDateValidator = () => {
  return check("appointmentTime")
    .notEmpty()
    .withMessage("Nie podano daty wizyty")
    .custom((date) => {
      const appointmentDate = new Date(date);
      const now = new Date();

      return appointmentDate > now;
    })
    .withMessage("Wprowadzona data musi byc z przyszlosci");
};

export default futureDateValidator;