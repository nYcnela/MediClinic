import express from "express";
import { fetchUserById , deleteUserById} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", fetchUserById);
router.delete("/:id", deleteUserById);

export default router;
