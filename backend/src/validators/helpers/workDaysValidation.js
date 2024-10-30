import { check } from "express-validator";

const workDaysValidator = () => {
  const validDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return check("workDays")
    .custom((workDays) => {
      return Array.isArray(workDays) && workDays.every((day) => validDays.includes(day.value));
    })
    .withMessage("Nie wprowadzono poprawnego dnia pracy");
};

export default workDaysValidator