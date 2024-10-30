import { check } from "express-validator";
import { fetchDoctorDegree } from "../../models/doctorModel.js";

const degreeValidator = (fieldName = "degree") => {
  return check(fieldName)
    .custom(async (degree) => {
      const degrees = await fetchDoctorDegree();
      return degrees.some((deg) => deg.id === degree);
    })
    .withMessage("Wprowadzono niepoprawny stopien naukowy!");
};

export default degreeValidator;