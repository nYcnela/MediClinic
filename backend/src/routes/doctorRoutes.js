import express from "express";
import {
  addDoctor,
  fetchSpecializations,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/specializations", fetchSpecializations);
router.post("/add", addDoctor);

export default router;
