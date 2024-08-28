import express from "express";
import {
  registerUser,
  login,
  checkIfUserExist,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.post("/check-user", checkIfUserExist);


export default router;
