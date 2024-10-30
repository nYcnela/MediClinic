import { check } from "express-validator";

const passwordValidator = () => {
  return check("password")
    .notEmpty()
    .withMessage("Nie wprowadzono hasła!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage("Haslo musi miec co najmniej 8 znakow, zawierac male i wielkie litery, cyfre oraz znak specjalny!");
};

export default passwordValidator;