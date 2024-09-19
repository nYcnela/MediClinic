import express from "express";
import { addDoctor, fetchAllspecializatons } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/specializations", fetchAllspecializatons)
router.post("/add", addDoctor);

export default router;