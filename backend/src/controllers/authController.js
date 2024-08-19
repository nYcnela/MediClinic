import { findUserByUsername } from "../models/userModel.js";

export const login = async (req, res) => {
    const {username, password} = req.body

    try{
        const user = await findUserByUsername(username)
        if(user && user.password === password){
            console.log("Login successful");
            return res.status(200).json({ message: "Login successful" });
        }else{
            console.log("Invalid username or password");
            return res.status(401).json({ message: "Invalid username or password" })
        }
    }catch(error){
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}