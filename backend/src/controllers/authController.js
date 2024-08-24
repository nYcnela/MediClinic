import {
  findUserByEmail,
  findUserByPesel,
  findUserByPhoneNumber,
} from "../models/userModel.js";
import { generateToken } from "../middleware/authMiddleware.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByEmail(username);
    if (user && user.password === password) {
      const token = generateToken({ id: user.id, email: user.email });
      console.log("token: " + token);
      console.log("Login successful");
      return res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } else {
      console.log("Invalid username or password");
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const isUserExistsByPesel = async (req, res) => {
  // console.log(req.body)
  const { data: pesel } = req.body;
  try {
    const user = await findUserByPesel(pesel);
    if (user) {
      console.log(`User with provided pesel ${pesel} already exists`);
      return res.status(409).json({
        exists: true,
        message: "User with this PESEL already exists.",
      });
    } else {
      console.log(`User with provided pesel ${pesel} doesnt exist`);
      return res
        .status(200)
        .json({ exists: false, message: "User with this PESEL does not exist." });
    }
  } catch (error) {
    console.error("Error checking user by PESEL:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking user by PESEL." });
  }
};

export const isUserExistsByPhoneNumber = async (req, res) => {
  const { data: phoneNumber } = req.body;
  try {
    const user = await findUserByPhoneNumber(phoneNumber);
    if (user) {
      console.log(
        `User with provided phone number ${phoneNumber} already exists`
      );
      return res.status(409).json({
        exists: true,
        message: "User with this phone number already exists",
      });
    } else {
      console.log(
        `User with provided phone number ${phoneNumber} doesnt exist`
      );
      return res.status(200).json({
        exists: false,
        message: "User with this phone number doesnt exist",
      });
    }
  } catch (error) {
    console.error("Error checking user by phone number:", error);
    return res
      .status(500)
      .json({
        error: "An error occurred while checking user by phone number.",
      });
  }
};

export const isUserExistsByEmail = async (req, res) => {
  const { data: email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      console.log(`User with provided email ${email} already exists`);
      return res.status(409).json({
        exists: true,
        message: "User with this email already exists",
      });
    } else {
      console.log(`User with provided email ${email} doesnt exist`);
      return res.status(200).json({
        exists: false,
        message: "User with this email doesnt exist",
      });
    }
  } catch (error) {
    console.error("Error checking user by email:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking user by email." });
  }
};
