import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import authRoutes from "./src/routes/authRoutes.js"


const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())


app.use("/", authRoutes) 


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})



