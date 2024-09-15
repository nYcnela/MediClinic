import db from "../config/dbConnection.js";
import bcrypt from "bcrypt";
import { registerUserTransaction } from "./userModel.js";
import { generatePassword } from "../utils/generators.js";
import { hashPassword } from "../utils/hashing.js";
import chalk from "chalk";

/**
 * Creates a new admin in the system by inserting data into the users and admins tables
 * 
 * This function creates a new admin with the given data, generates a password,
 * hashes it, and saves the information in the database
 * 
 * @param {string} name - admin's first name
 * @param {string} surname - admin's last name
 * @param {string} pesel - admin's PESEL number
 * @param {string} dialingCode - dialing code for the admin's phone number
 * @param {string} phoneNumber - admin's phone number
 * @param {string} email - admin's email address
 * 
 * @returns {void} This function does not return a value. It logs the result to the console and exits the process
 * 
 * @example
 * // Running the script from the /backend/src/models folder
 * // Command to create an admin:
 * node createAdmin.js "Name" "Lastname" "12345678901" "+48" "111222333" "admin.test@gmail.com"
 * 
 * // Expected console output on success:
 * // Admin successfully created, password: <generated_password>
 * 
 * // Expected console output on failure:
 * // Error adding admin to the database <error_message>
 */
const createAdmin = async (
  name,
  surname,
  pesel,
  dialingCode,
  phoneNumber,
  email
) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN")

    const password = generatePassword();
    const hashedPassword = await hashPassword(password);

    const data = {
      name,
      surname,
      pesel,
      dialingCode,
      phoneNumber,
      email,
      password: hashedPassword,
    };
    const userId = await registerUserTransaction(data, "admin", client);
    console.log(userId);

    if(userId === -1){
      throw new error("error creating user(admin) in the users table")
    }

    const query = `INSERT INTO admins (user_id, must_change_password) 
                        VALUES($1, $2)`;
    await client.query(query, [userId, true]);

    await client.query("COMMIT")    
    console.log(`Admin sucessfully created, password: ${chalk.yellow(password)}`);
    process.exit(0)
  } catch (error) {
    await client.query("ROLLBACK")
    console.log("Error adding admin to the database", error);
    process.exit(1)
  }finally{
    client.release()
  }
};

const args = process.argv.slice(2);
const [name, surname, pesel, dialingCode, phoneNumber, email] = args;

createAdmin(name, surname, pesel, dialingCode, phoneNumber, email);
