import express from "express";
import { registerUser, login, checkIfUserExist, extendToken} from "../controllers/authController.js";
import { validateLogin, validateRegister } from "../validators/authValidator.js";
import { jwtMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, login);
router.post("/extend-token", jwtMiddleware, extendToken)
router.post("/check-user", checkIfUserExist);

export default router;
