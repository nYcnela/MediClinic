import jwt from "jsonwebtoken";
import env from "dotenv";

env.config({ path: "./src/config/.env" });

export const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
        message: "token uwierzytelniajacy nie istnieje lub jest niepoprawny",
      });
  }
  const token = req.headers.authorization.split(" ")[1];
  try{
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedToken;
    next()
  }catch(error){
    return res.status(403).json({message: "token juz wygasl"})
  }
};

export const verifyAdmin = (req, res, next) => {
    const userRole = req.user.role;
    if(userRole != "admin"){
        return res.status(403).json({message: "Brak uprawnien do tego zasobu"})
    }
  next();
};
