import express from "express";
import {
  fetchAvailableAppointments,
  fetchBookedAppointments,
  createNewAppointment,
  getAppointment,
  deleteAppointment,
  getUserAppointments,
} from "../controllers/appointmentController.js";
import validateNewAppointment from "../validators/newAppointmentValidator.js"
import {verifyAccessToken, authorizeUserOrAdmin} from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create", validateNewAppointment, createNewAppointment);
router.get("/schedule/:id", fetchAvailableAppointments);
router.get("/booked/:id", fetchBookedAppointments);
router.get("/user-appointments/:id", getUserAppointments);
// router.get("/user-appointments/:id", verifyAccessToken, authorizeUserOrAdmin, getUserAppointments);
router.get("/:id", getAppointment);
router.delete("/:id", deleteAppointment);

export default router;
