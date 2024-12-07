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
import { validateDate } from "../validators/appointmentValidator.js";
import { verifyAccessToken, authorizeUserOrAdmin, authorizeDoctorOrAdmin, authorizeAdmin } from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/create", validateNewAppointment, createNewAppointment);
router.get("/schedule/:id", fetchAvailableAppointments);
router.get("/booked/:id", fetchBookedAppointments);
router.get("/user-appointments/:id", getUserAppointments);
router.get("/:id", getAppointment);
router.delete("/:id", deleteAppointment);


// router.post("/create", verifyAccessToken, authorizeUserOrAdmin, validateNewAppointment, createNewAppointment);
// router.get("/schedule/:id",  verifyAccessToken, validateDate, fetchAvailableAppointments);
// router.get("/booked/:id", verifyAccessToken, validateDate("startDate"), validateDate("endDate"), fetchBookedAppointments);
// router.get("/user-appointments/:id", getUserAppointments);
// router.get("/user-appointments/:id", verifyAccessToken, authorizeUserOrAdmin, getUserAppointments);
// router.get("/:id", verifyAccessToken, getAppointment);
// router.delete("/:id", verifyAccessToken, deleteAppointment);

export default router;
