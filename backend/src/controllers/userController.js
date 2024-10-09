import { fetchUser } from "../models/userModel.js";

export const fetchUserById = async (req, res) => {
  const { id: userId } = req.params;
  console.log("to sie wyknuje ", userId);
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
