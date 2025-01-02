import {
  fetchUser,
  deleteUser,
  updateUserProfile,
  findUserByEmail,
  findUserByPhoneNumber,
  updateUserPassword,
  findUserById,
  fetchAllUsers,
} from "../Repositories/userRepository.js";
import { formatPhoneNumber } from "../utils/formatters.js";
import { hashPassword } from "../utils/hashing.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers(); 

    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Blad podczas pobierania uzytkownikow" });
  }
}

export const fetchUserById = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await fetchUser(userId);

    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono uzytkownika z podanym id" });
    }

    const { id, name, surname } = user;
    let userData = { value: id, label: name + " " + surname };

    res.status(200).json({ user: userData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Blad podczas pobierania uzytkownika" });
  }
};

export const deleteUserById = async (req, res) => {
  const { id: userId } = req.params;

  const user = await findUserById(userId);
  if (user === undefined) return res.status(404).json({ message: "Nie znaleziono uzytkownika!" });

  try {
    const deleted = await deleteUser(userId);
    // console.log("usuniety: ", deleted);
    // if (deleted < 0) {
    //   return res.status(404).json({ message: `Uzytkownik o podanym id: ${userId} nie istnieje` });
    // }
    return res.status(200).json({ message: "Uzytkownik zostal pomyslnie usuniety" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" });
  }
};

export const updateProfile = async (req, res) => {
  const { id: userId } = req.params;
  let { email, phoneNumber: fullPhoneNumber } = req.body;

  const { dialingCode, phoneNumber } = await formatPhoneNumber(fullPhoneNumber);
  // console.log(dialingCode, " i ", phoneNumber);
  const userByEmail = await findUserByEmail(email);
  const userByPhoneNumber = await findUserByPhoneNumber(dialingCode, phoneNumber);

  const user = await findUserById(userId);
  if (user === undefined) return res.status(404).json({ message: "Nie znaleziono uzytkownika!" });

  if (userByEmail !== undefined && userByPhoneNumber !== undefined && userByEmail.id === userByPhoneNumber.id) {
    return res.status(400).json({ message: "Uzytkownik z podanym email'em i nr telefonu juz istnieje" });
  } else if (userByEmail !== undefined && userByEmail.id != userId) {
    return res.status(400).json({ message: "Podany email jest juz zajety przez innego uzytkownika" });
  } else if (userByPhoneNumber !== undefined && userByPhoneNumber.id != userId) {
    return res.status(400).json({ message: "Podany numer telefonu jest juz zajety przez innego uzytkownika" });
  }

  try {
    const updatedProfile = await updateUserProfile(userId, email, dialingCode, phoneNumber);
    if (!updatedProfile) return res.status(204).json({ message: "Dane nie zostaly zmieonione" });
    return res.status(200).json({ message: "Dane uzytkownika zostaly zedytowane" });
  } catch (error) {
    console.log("Error updating profile", error.message);
    return res.status(500).json({ message: "Blad podczas aktualizowania profilu" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { password } = req.body;

    const user = await findUserById(userId);
    if (user === undefined) return res.status(404).json({ message: "Podany uzytkownik nie istnieje!" });

    const hashedPassword = await hashPassword(password);
    const updated = updateUserPassword(userId, hashedPassword);
    if (!updated) return res.status(204).json({ message: "Haslo nie zostalo zmienione" });

    return res.status(200).json({ message: "Haslo zostalo pomyslnie zmienione" });
  } catch (error) {
    console.log("Error updating password", error.message);
    return res.status(500).json({ message: "Blad podczas aktualizacji hasla" });
  }
};
