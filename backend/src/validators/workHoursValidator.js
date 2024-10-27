import { check, validationResult } from "express-validator";

export const validateWorkHours = [
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
