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
    const user = await registerUserTransaction(data, "admin");
    // console.log(user);
    
    //user is 1 if successful and -1 if not
    if(user === 1){
      console.log(`Admin sucessfully created, password: ${password}`);
    }else{
      console.log("Error creating admin");
    }
  } catch (error) {
    console.log("Error adding admin to the database", error);
  }
};

const args = process.argv.slice(2);
const [name, surname, pesel, dialingCode, phoneNumber, email] = args;

createAdmin(name, surname, pesel, dialingCode, phoneNumber, email);
