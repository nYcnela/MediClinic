import express from "express";
import { registerUser, login, checkIfUserExist } from "../controllers/authController.js";
import { validateLogin, validateRegister } from "../validators/authValidator.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, login);

router.post("/check-user", checkIfUserExist);

export default router;
