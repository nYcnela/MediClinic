import express from "express";
import { fetchUserById, deleteUserById, updateProfile, updatePassword, getAllUsers } from "../controllers/userController.js";
import { validateEmailAndPhoneNumber } from "../validators/updateProfileValidator.js";
import { validatePassword } from "../validators/changePasswordValidator.js";
import { verifyAccessToken, authorizeUserOrAdmin, authorizeAdmin} from "../middleware/authMiddleware.js"

const router = express.Router();

// router.get("/:id", fetchUserById);
// router.delete("/:id", deleteUserById);
// router.put("/update/credentials/:id", validateEmailAndPhoneNumber, updateProfile);
// router.patch("/update/password/:id", validatePassword, updatePassword);

router.get("/all", verifyAccessToken, authorizeAdmin, getAllUsers)
router.get("/:id", verifyAccessToken, authorizeUserOrAdmin, fetchUserById);
router.delete("/:id", verifyAccessToken, authorizeUserOrAdmin, deleteUserById);
router.put("/update/credentials/:id", verifyAccessToken, authorizeUserOrAdmin, validateEmailAndPhoneNumber, updateProfile);
router.patch("/update/password/:id", verifyAccessToken, authorizeUserOrAdmin, validatePassword, updatePassword);
export default router;
