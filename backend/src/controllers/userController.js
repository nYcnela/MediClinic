import {
  fetchUser,
  deleteUser,
  updateUserProfile,
  findUserByEmail,
  findUserByPhoneNumber,
  updateUserPassword,
  findUserById,
} from "../models/userModel.js";

import { hashPassword } from "../utils/hashing.js";

export const fetchUserById = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const { id, name, surname } = await fetchUser(userId);
    let userData = { value: id, label: name + " " + surname };

    if (!!userData) {
      res.status(200).json({ user: userData });
    } else {
      res.status(404).json({ message: "User with provided id does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const deleteUserById = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const deleted = await deleteUser(userId);
    // console.log("usuniety: ", deleted);
    if (deleted < 0) {
      return res.status(404).json({ message: `Uzytkownik o podanym id: ${userId} nie istnieje` });
    }
    return res.status(200).json({ message: "Uzytkownik zostal pomyslnie usuniety" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" });
  }
};

export const updateProfile = async (req, res) => {
  const { id: userId } = req.params;
  let { email, phoneNumber } = req.body;

  const userByEmail = await findUserByEmail(email);
  const userByPhoneNumber = await findUserByPhoneNumber("+48", phoneNumber);

  if (userByEmail !== undefined && userByPhoneNumber !== undefined && userByEmail.id === userByPhoneNumber.id) {
    return res.status(400).json({ message: "Uzytkownik z podanym email'em i nr telefonu juz istnieje" });
  } else if (userByEmail !== undefined && userByEmail.id != userId) {
    return res.status(400).json({ message: "Podany email jest juz zajety przez innego uzytkownika" });
  } else if (userByPhoneNumber !== undefined && userByPhoneNumber.id != userId) {
    return res.status(400).json({ message: "Podany numer telefonu jest juz zajety przez innego uzytkownika" });
  }

  try {
    const updatedProfile = await updateUserProfile(userId, email, phoneNumber);
    if (!updatedProfile) return res.status(204).json({ message: "Dane nie zostaly zmieonione" });
    return res.status(200).json({ message: "Dane uzytkownika zostaly zedytowane" });
  } catch (error) {
    console.log("Error updating profile", error.message);
    return res.status(500).json({ message: "Blad podczas aktualizowania profilu" });
  }
};
