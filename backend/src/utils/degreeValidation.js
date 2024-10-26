import { fetchDoctorDegree } from "../models/doctorModel.js";

export const isDegreeValid = async (degreeId) => {
  try {
    const degrees = await fetchDoctorDegree();
    if (!degrees.some((degree) => degree.id === degreeId)) return false;
    return true;
  } catch (error) {
    console.log("Error getting doctors' degree", error.message);
    throw error;
  }
};
