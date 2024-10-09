import express from "express";
import {
  fetchAvailableAppointments,
  fetchBookedAppointments,
  createNewAppointment,
  getAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/create", createNewAppointment);
router.get("/schedule/:id", fetchAvailableAppointments);
router.get("/booked/:id", fetchBookedAppointments);
router.get("/:id", getAppointment);
router.delete("/:id", deleteAppointment);

export default router;
