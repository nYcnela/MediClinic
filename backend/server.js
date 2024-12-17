import express from "express"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./src/routes/authRoutes.js"
import doctorRoutes from "./src/routes/doctorRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import appointmentRoutes from "./src/routes/appointmentRoutes.js"
import { verifyAccessToken, verifyAdmin } from "./src/middleware/authMiddleware.js"

const app = express()
const port = 5000

app.use(
    cors({
      origin: "http://localhost:5173",
      origin: "http://127.0.0.1:5173",
      credentials: true,
    })
);
app.use(bodyParser.json())
app.use(cookieParser());


app.use("/auth", authRoutes) 
app.use("/doctor", doctorRoutes)
app.use("/user", userRoutes)
app.use("/appointment", appointmentRoutes)



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})



