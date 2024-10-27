import { fetchDoctorSpecializations } from "../models/doctorModel.js";

export const isSpecializationValid = async (specializationId) => {
  try {
    const specializations = await fetchDoctorSpecializations();
    if (!specializations.some((specialization) => specialization.id === specializationId)) return false;
    return true;
  } catch (error) {
    console.log("Error getting specializations", error.message);
    throw error;
  }
};
