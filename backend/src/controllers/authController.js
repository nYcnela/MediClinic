import jwt from "jsonwebtoken";
import env from "dotenv";
import { registerUserTransaction, findUserByEmail, findUserByPesel, findUserByPhoneNumber } from "../Repositories/userRepository.js";
import bycrypt from "bcrypt";
import { formatPhoneNumber } from "../utils/formatters.js";
import { hashPassword } from "../utils/hashing.js";
import { getBirthDateFromPESEL, getGenderFromPESEL } from "../utils/peselUtils.js";
import { generateToken } from "../utils/generators.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config({ path: path.resolve(__dirname, "./.env") });

/**
 * Adds a new user to the system
 *
 * This function takes user data from the request, hashes the password, and inserts the data transactionally
 *
 * @param {Object} req - the HTTP request object, expected to contain:
 *   @param {string} req.body.name - user's first name
 *   @param {string} req.body.surname - user's last name
 *   @param {string} req.body.pesel - user's PESEL number
 *   @param {string} req.body.email - user's email address
 *   @param {string} req.body.phoneNumber - user's full phone number
 *   @param {string} req.body.password - user's raw password (to be hashed)
 *
 * @returns {void} sends a JSON response with a success message on success or an error message on failure
 *
 */
export const registerUser = async (req, res) => {
  // console.log(req.body);
  const { name, surname, pesel, email, phoneNumber: fullPhoneNumber, password } = req.body;
  const user = await findUserByPesel(pesel);
  if (user !== undefined) return res.status(400).json({ message: "Podany uzytkownik juz istnieje" });

  const birthDay = getBirthDateFromPESEL(pesel);
  const sex = getGenderFromPESEL(pesel);

  const { dialingCode, phoneNumber } = formatPhoneNumber(fullPhoneNumber);

  try {
    const hashedPassword = await hashPassword(password);

    const userId = await registerUserTransaction(
      {
        name,
        surname,
        pesel,
        dialingCode,
        phoneNumber,
        email,
        sex,
        birthDay,
        password: hashedPassword,
      },
      "user"
    );
    console.log(userId);
    return res.status(201).json({ message: `Użytkownik został pomyślnie zarejestrowany. id: ${userId}` });
  } catch (error) {
    console.log(`Error during user registration: ${error.message}`);
    return res.status(409).json({ message: "Błąd podczas dodawania użytkownika" });
  }
};

/**
 * Logs a user into the system by verifying their credentials
 *
 * This function checks the user's email and password and if valid, generates a JWT token for the session
 *
 * @param {Object} req - the HTTP request object, expected to contain:
 *  @param {string} req.body.username - user's email adress
 *  @param {string} req.body.password - user's raw password
 *
 * @returns {void} sends a JSON response with a JWT token on success or an error message on failure
 */
export const login = async (req, res) => {
  const { username: email, password } = req.body;
  //  console.log(req.body);
  try {
    let user = await findUserByEmail(email);
    if (user === undefined) return res.status(404).json({ message: "Wprowadzony uzytkownik nie jest zarejestrowany" });
    // console.log(user);
    const checkPassword = await bycrypt.compare(password, user.password);

    if (user && checkPassword) {
      const token = generateToken(
        {
          id: user.id,
          name: user.name,
          surname: user.surname,
          dialingCode: user.dialing_code,
          phoneNumber: user.phone_number,
          email: user.email,
          birthDay: user.birth_date.toISOString().split("T")[0],
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        "1h"
      );

      const refreshToken = generateToken(
        {
          id: user.id,
          name: user.name,
          surname: user.surname,
          dialingCode: user.dialing_code,
          phoneNumber: user.phone_number,
          email: user.email,
          birthDay: user.birth_date.toISOString().split("T")[0],
          role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        "24h"
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // console.log("token: " + token);
      console.log("Login successful");
      return res.status(200).json({
        message: "Użytkownik został pomyślnie zalogowany",
        token: token,
      });
    } else {
      console.log("Invalid username or password");
      return res.status(401).json({ message: "Błędny email lub hasło!" });
    }
  } catch (error) {
    console.log("Server error: ", error.message);
    return res.status(500).json({ message: "Błąd serwera" });
  }
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "token nie istnieje lub jest niepoprawny",
    });
  }

  try {
    const verifiedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      {
        id: verifiedRefreshToken.id,
        name: verifiedRefreshToken.name,
        surname: verifiedRefreshToken.surname,
        email: verifiedRefreshToken.email,
        birthDay: verifiedRefreshToken.birthDay,
        role: verifiedRefreshToken.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token: accessToken });
  } catch (error) {
    console.log("Error verifying refresh token: ", error.message);
    return res.status(403).json({ message: "Refresh token jest niewazny" });
  }
};

/**
 * Check if a user exists in the system by their PESEL, phone number or email
 *
 * @param {Object} req - the HTTP request object, expected to contain:
 *  @param {string} req.body.data - the value to check (PESEL, phone number or email)
 *  @param {string} req.body.type - the type of data being checked ("pesel", ...)
 *
 * @returns {void} sends a JSON response indicating whether the user exists or not, along with a success message
 */
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
      console.log(`User with provided ${type}: ${formattedData} already exists`);
      return res.status(409).json({
        exists: true,
        message: `Użytkownik z podanym ${
          type === "pesel" ? "peselem" : type === "phoneNumber" ? "numerem telefonu" : "adresem email"
        } jest już zarejestrowany`,
      });
    } else {
      console.log(`User with provided ${type} ${formattedData} doesn't exist`);
      return res.status(200).json({
        exists: false,
        message: `Użytkownik z podanym ${
          type === "pesel" ? "peselem" : type === "phoneNumber" ? "numerem telefonu" : "adresem email"
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
