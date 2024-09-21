import express from "express";
import {
  addDoctor,
  fetchSpecializations,
  fetchDoctors,
  fetchDoctorById,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/list", fetchDoctors);
router.get("/:id", fetchDoctorById);
router.get("/specializations", fetchSpecializations);
router.post("/add", addDoctor);

export default router;
