import express from "express";
import {
  addDoctor,
  fetchSpecializations,
  getDoctorBySpecializations,
  fetchDoctors,
  fetchDoctorById,
  getDoctorDegree,
  updateWorkHours,
  getDoctorWorkHours,
} from "../controllers/doctorController.js";
import { validateDoctorForm } from "../validators/doctorValidator.js";
import { validateWorkHours } from "../validators/workHoursValidator.js";

const router = express.Router();

router.get("/work-hours/:id", getDoctorWorkHours)
router.get("/degree", getDoctorDegree);
router.get("/specializations", fetchSpecializations);
router.get("/specializations/:specializationName", getDoctorBySpecializations);
router.get("/list", fetchDoctors);
router.get("/:id", fetchDoctorById);
router.post("/add", validateDoctorForm, addDoctor);
router.patch("/update/work-hours/:id", validateWorkHours, updateWorkHours);

export default router;
