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
import { verifyAccessToken, authorizeUserOrAdmin, authorizeDoctorOrAdmin, authorizeAdmin } from "../middleware/authMiddleware.js"


const router = express.Router();

router.get("/work-hours/:id", getDoctorWorkHours)
router.get("/degree", getDoctorDegree);
router.get("/specializations", fetchSpecializations);
router.get("/specializations/:specializationName", getDoctorBySpecializations);
router.get("/list", fetchDoctors);
router.get("/:id", fetchDoctorById);
router.post("/add", validateDoctorForm, addDoctor);
router.patch("/update/work-hours/:id", validateWorkHours, updateWorkHours);


// router.get("/work-hours/:id", verifyAccessToken, authorizeDoctorOrAdmin, getDoctorWorkHours)
// router.get("/degree", verifyAccessToken, authorizeAdmin, getDoctorDegree);
// router.get("/specializations", fetchSpecializations);
// router.get("/specializations/:specializationName", getDoctorBySpecializations);
// router.get("/list", fetchDoctors);
// router.get("/:id", verifyAccessToken, authorizeUserOrAdmin, fetchDoctorById);
// router.post("/add", verifyAccessToken, authorizeAdmin, validateDoctorForm, addDoctor);
// router.patch("/update/work-hours/:id", verifyAccessToken, authorizeAdmin, validateWorkHours, updateWorkHours);

export default router;
