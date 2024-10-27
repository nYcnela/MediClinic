import express from "express";
import { fetchUserById, deleteUserById, updateProfile, updatePassword } from "../controllers/userController.js";
import { validateEmailAndPhoneNumber } from "../validators/updateProfileValidator.js";
import { validatePassword } from "../validators/changePasswordValidator.js";

const router = express.Router();

router.get("/:id", fetchUserById);
router.delete("/:id", deleteUserById);
router.put("/update/credentials/:id", validateEmailAndPhoneNumber, updateProfile);
router.patch("/update/password/:id", validatePassword, updatePassword);

export default router;
