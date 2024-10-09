import express from "express";
import { fetchUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", fetchUserById);

export default router;
