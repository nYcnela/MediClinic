import { check } from "express-validator";

const workHoursValidator = (fieldName = "workHours") => {
  return check(fieldName)
    .custom((workHours) => {
      for (const day in workHours) {
        const { start, end } = workHours[day];
        if (start && !/^\d{2}:\d{2}$/.test(start)) return false;
        if (end && !/^\d{2}:\d{2}$/.test(end)) return false;
      }
      return true;
    })
    .withMessage("Niepoprawny format wprowadzonych godzin pracy");
};

export default workHoursValidator;