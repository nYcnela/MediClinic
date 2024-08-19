import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import { login } from "./src/controllers/authController.js";

const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json())


app.post("/login", login);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})



