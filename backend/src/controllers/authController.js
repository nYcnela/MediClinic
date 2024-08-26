import { generateToken } from "../middleware/authMiddleware.js";
import {
  registerUserTransaction,
  findUserByEmail,
  findUserByPesel,
  findUserByPhoneNumber,
} from "../models/userModel.js";
import bycrypt from "bcrypt";

const saltRounds = 12;

export const registerUser = async (req, res) => {
  // console.log(req.body);
  const {
    name,
    surname,
    pesel,
    email,
    phoneNumber: fullPhoneNumber,
    password,
  } = req.body;
  const { dialingCode, phoneNumber } = formatPhoneNumber(fullPhoneNumber);

  bycrypt.hash(password, saltRounds, async (err, hashedPassword) => {
    // console.log(hashedPassword);
    if (err) {
      console.log(`Error hashing password: ${err}`);
    } else {
      try {
        const user = await registerUserTransaction({
          name,
          surname,
          pesel,
          dialingCode,
          phoneNumber,
          email,
          password: hashedPassword,
        });
        console.log(user);
        res
          .status(201)
          .json({ message: "User registered successfully", userId: user.id });
      } catch (error) {
        console.log(`Error during user registration: ${error.message}`);
        res.status(409).json({ error: error.message });
      }
    }
  });
};

export const login = async (req, res) => {
  const { username: email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    // console.log(user);
    const checkPassword = await bycrypt.compare(password, user.password);

    if (user && checkPassword) {
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

const formatPhoneNumber = (fullPhoneNumber) => {
  const phoneNumberWithoutSpaces = fullPhoneNumber.replaceAll(" ", "");
  const phoneNumber = phoneNumberWithoutSpaces.slice(-9);
  let dialingCode = phoneNumberWithoutSpaces.slice(0, -9);
  if (dialingCode === "") dialingCode = "+48";
  return { dialingCode, phoneNumber };
};

export const userExistsByPesel = async (req, res) => {
  // console.log(req.body)
  const { data: pesel } = req.body;
  try {
    const user = await findUserByPesel(pesel);
    if (user) {
      console.log(`User with provided pesel ${pesel} already exists`);
      return res.status(409).json({
        exists: true,
        message: "Użytkownik z podanym peselem jest już zarejestrowany",
      });
    } else {
      console.log(`User with provided pesel ${pesel} doesnt exist`);
      return res.status(200).json({
        exists: false,
        message: "Użytkownik z podanym peselem nie istnieje",
      });
    }
  } catch (error) {
    console.error("Error checking user by PESEL:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking user by PESEL" });
  }
};

export const userExistsByPhoneNumber = async (req, res) => {
  const { dialingCode, phoneNumber } = formatPhoneNumber(req.body.data);
  // console.log(dialingCode, phoneNumber);
  try {
    const user = await findUserByPhoneNumber(dialingCode, phoneNumber);
    if (user) {
      console.log(
        `User with provided phone number ${phoneNumber} already exists`
      );
      return res.status(409).json({
        exists: true,
        message:
          "Użytkownik z podanym numerem telefonu jest już zarejestrowany",
      });
    } else {
      console.log(
        `User with provided phone number ${phoneNumber} doesnt exist`
      );
      return res.status(200).json({
        exists: false,
        message: "Użytkownik z podanym numerem telefonu nie istnieje",
      });
    }
  } catch (error) {
    console.error("Error checking user by phone number:", error);
    return res.status(500).json({
      error: "An error occurred while checking user by phone number",
    });
  }
};

export const userExistsByEmail = async (req, res) => {
  const { data: email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) {
      console.log(`User with provided email ${email} already exists`);
      return res.status(409).json({
        exists: true,
        message: "Użytkownik z podanym adresem email jest już zarejestrowany",
      });
    } else {
      console.log(`User with provided email ${email} doesnt exist`);
      return res.status(200).json({
        exists: false,
        message: "Użytkownik z podanym adresem email nie istnieje",
      });
    }
  } catch (error) {
    console.error("Error checking user by email:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while checking user by email" });
  }
};
