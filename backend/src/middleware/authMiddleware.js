import jwt from "jsonwebtoken";
import env from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config({ path: path.resolve(__dirname, "./.env") });

export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "token uwierzytelniajacy nie istnieje lub jest niepoprawny",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "token juz wygasl" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole != "admin") {
    return res.status(403).json({ message: "Brak uprawnien do tego zasobu" });
  }
  next();
};

export const authorizeUserOrAdmin = (req, res, next) => {
  const { id: userIdFromToken, role: userRole } = req.user; 
  const userIdFromUrl = req.params.id ? parseInt(req.params.id, 10) : null;
  const userIdFromBody = req.body.userId || null;
  // const userIdFromBody = req.body.userId || req.body.id || null;

  if (userIdFromToken === userIdFromUrl || userIdFromToken === userIdFromBody || userRole === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'Brak dostępu do tego zasobu' });
};

export const authorizeDoctorOrAdmin = (req, res, next) => {
  const { id: doctorIdFromToken, role: userRole } = req.user; 
  const doctorIdFromUrl = parseInt(req.params.id, 10); 

  if (doctorIdFromToken === doctorIdFromUrl || userRole === 'admin') {
    return next(); 
  }

  return res.status(403).json({ message: 'Brak dostępu do tego zasobu' });
};

