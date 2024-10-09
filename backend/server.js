import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import authRoutes from "./src/routes/authRoutes.js"
import doctorRoutes from "./src/routes/doctorRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import appointmentRoutes from "./src/routes/appointmentRoutes.js"
import { jwtMiddleware, verifyAdmin } from "./src/middleware/authMiddleware.js"

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())


app.use("/", authRoutes) 
app.use("/doctor", doctorRoutes)
app.use("/user", userRoutes)
app.use("/appointment", appointmentRoutes)



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})



