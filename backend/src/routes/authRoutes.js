import express from "express";
import {
  login,
  isUserExistsByPesel,
  isUserExistsByPhoneNumber,
  isUserExistsByEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

router.post("/check-pesel", isUserExistsByPesel);
router.post("/check-phone-number", isUserExistsByPhoneNumber)
router.post("/check-email", isUserExistsByEmail)

export default router;
