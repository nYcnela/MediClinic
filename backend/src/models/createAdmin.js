import db from "../config/dbConnection.js";
import bcrypt from "bcrypt";
import { registerUserTransaction } from "./userModel.js";

const saltRounds = 12;
const passwordLength = 10;

const generatePassword = (passwordLength) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

const createAdmin = async (
  name,
  surname,
  pesel,
  dialingCode,
  phoneNumber,
  email
) => {
  try {
    await db.query("BEGIN")

    const password = generatePassword(passwordLength);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = {
      name,
      surname,
      pesel,
      dialingCode,
      phoneNumber,
      email,
      password: hashedPassword,
    };
    const userId = await registerUserTransaction(data, "admin");
    console.log(userId);

    //userId is > 0 if successful and -1 if not
    if(userId === -1){
      throw new error("error creating user(admin) in the users table")
    }

    const query = `INSERT INTO admins (user_id, must_change_password) 
                        VALUES($1, $2)`;
    await db.query(query, [userId, true]);

    await db.query("COMMIT")    
    console.log(`Admin sucessfully created, password: ${password}`);
    process.exit(0)
  } catch (error) {
    await db.query("ROLLBACK")
    console.log("Error adding admin to the database", error);
    process.exit(1)
  }
};

const args = process.argv.slice(2);
const [name, surname, pesel, dialingCode, phoneNumber, email] = args;

createAdmin(name, surname, pesel, dialingCode, phoneNumber, email);
