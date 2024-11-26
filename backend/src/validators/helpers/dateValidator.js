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

export const dateValidator = () => {
  return check("date")
    .notEmpty()
    .withMessage("Nie podano daty wizyty")
    .custom((date) => {
      const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

      if (!regex.test(date)) {
        throw new Error("Data nie jest w poprawnym formacie (YYYY-MM-DD HH:mm:s)");
      }

      const scheduleDate = new Date(date.replace(" ", "T")); 
      if (isNaN(scheduleDate.getTime())) {
        throw new Error("Nieprawidłowa data");
      }

      return true;
    })
    .withMessage("Nie podano poprawnej daty");
};


export default futureDateValidator;