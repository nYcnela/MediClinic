import express from "express";
import {
  fetchAvailableAppointments,
  fetchBookedAppointments,
  createNewAppointment,
  getAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import validateNewAppointment from "../validators/newAppointmentValidator.js"

const router = express.Router();

router.post("/create", validateNewAppointment, createNewAppointment);
router.get("/schedule/:id", fetchAvailableAppointments);
router.get("/booked/:id", fetchBookedAppointments);
router.get("/:id", getAppointment);
router.delete("/:id", deleteAppointment);

export default router;
