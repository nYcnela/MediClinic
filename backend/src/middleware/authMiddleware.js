import jwt from "jsonwebtoken"
import env from "dotenv"

env.config({path: './src/config/.env'})

export const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'})
}