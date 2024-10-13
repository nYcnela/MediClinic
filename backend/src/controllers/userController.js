import { fetchUser, deleteUser } from "../models/userModel.js";

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
