import express from "express";
import {
  login,
  userExistsByPesel,
  userExistsByPhoneNumber,
  userExistsByEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

router.post("/check-pesel", userExistsByPesel);
router.post("/check-phone-number", userExistsByPhoneNumber)
router.post("/check-email", userExistsByEmail)

export default router;
