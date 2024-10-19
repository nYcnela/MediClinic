import express from "express";
import {
  addDoctor,
  fetchSpecializations,
  getDoctorBySpecializations,
  fetchDoctors,
  fetchDoctorById,
  getDoctorDegree,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/degree", getDoctorDegree);
router.get("/specializations", fetchSpecializations);
router.get("/specializations/:specializationName", getDoctorBySpecializations);
router.get("/list", fetchDoctors);
router.get("/:id", fetchDoctorById);
router.post("/add", addDoctor);

export default router;
