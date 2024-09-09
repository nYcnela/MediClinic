import jwt from "jsonwebtoken"
import env from "dotenv"
import {
  registerUserTransaction,
  findUserByEmail,
  findUserByPesel,
  findUserByPhoneNumber,
} from "../models/userModel.js";
import bycrypt from "bcrypt";

env.config({path: './src/config/.env'})

const saltRounds = 12;


export const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'})
}

export const registerUser = async (req, res) => {
  console.log(req.body);
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
  // console.log(fullPhoneNumber);
  const phoneNumber = fullPhoneNumber.slice(-9);
  const dialingCode = fullPhoneNumber.slice(0, -9);
  return { dialingCode, phoneNumber };
};

export const checkIfUserExist = async (req, res) => {
  console.log(req.body);
  const { data, type } = req.body;

  let user;
  let formattedData = data;

  try {
    switch (type) {
      case "pesel":
        user = await findUserByPesel(data);
        break;
      case "phoneNumber":
        const { dialingCode, phoneNumber } = formatPhoneNumber(data);
        formattedData = phoneNumber;
        user = await findUserByPhoneNumber(dialingCode, phoneNumber);
        break;
      case "email":
        user = await findUserByEmail(data);
        break;
    }

    if (user) {
      console.log(
        `User with provided ${type}: ${formattedData} already exists`
      );
      return res.status(409).json({
        exists: true,
        message: `Użytkownik z podanym ${
          type === "pesel"
            ? "peselem"
            : type === "phoneNumber"
            ? "numerem telefonu"
            : "adresem email"
        } jest już zarejestrowany`,
      });
    } else {
      console.log(`User with provided ${type} ${formattedData} doesn't exist`);
      return res.status(200).json({
        exists: false,
        message: `Użytkownik z podanym ${
          type === "pesel"
            ? "peselem"
            : type === "phoneNumber"
            ? "numerem telefonu"
            : "adresem email"
        } nie istnieje`,
      });
    }
  } catch (error) {
    console.error(`Error checking user by ${type}:`, error);
    return res.status(500).json({
      error: `An error occurred while checking user by ${type}`,
    });
  }
};
