import { check } from "express-validator";
import { fetchDoctorSpecializations } from "../../Repositories/doctorRepository.js";

export const specializationValidator = (fieldName = "specialization") => {
  return check(fieldName)
    .custom(async (specializationsArr) => {
      const specializations = await fetchDoctorSpecializations();
      return specializationsArr.every((specialization) => specializations.some((spec) => spec.id === specialization.value));
    })
    .withMessage("Podano niepoprawna specjalizacje!");
};

export default specializationValidator;
