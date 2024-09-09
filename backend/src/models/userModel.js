import db from "../config/dbConnection.js";

export const createNewUser = async (
  role,
  pesel,
  name,
  surname,
  email,
  dialingCode,
  phoneNumber,
  password,
  mustChangepassword,
) => {
  try {
    const data = [
      role,
      pesel,
      name,
      surname,
      email,
      dialingCode,
      phoneNumber,
      password,
      mustChangepassword,
    ];
    const query =
      "INSERT INTO users (role, pesel, name, surname, email, dialing_code, phone_number, password, must_change_password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    await db.query(query, data);
    return 1;
  } catch (error) {
    console.log(`Error adding user to database: ${error.message}`);
    return -1;
  }
};

//this function handles the registration of a regular user within a database transacion
export const registerUserTransaction = async (userdata) => {
  const { name, surname, pesel, email, dialingCode, phoneNumber, password } =
    userdata;

  try {
    await db.query("BEGIN");

    const user = await findUserByPesel(pesel);
    // console.log(user);
    if (user) {
      await db.query("ROLLBACK");
      throw new Error("User with this PESEL already exists");
    }

    const result = createNewUser(
      "user",
      pesel,
      name,
      surname,
      email,
      dialingCode,
      phoneNumber,
      password,
      "false",
    );

    await db.query("COMMIT");
    return result;
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by username: ", error.message);
  }
};

export const findUserByPesel = async (pesel) => {
  try {
    const query = "SELECT * FROM users WHERE pesel = $1";
    const result = await db.query(query, [pesel]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by pesel: ", error.message);
  }
};

export const findUserByPhoneNumber = async (dialing_code, number) => {
  try {
    const query =
      "SELECT * FROM users WHERE dialing_code = $1 AND phone_number = $2";
    const result = await db.query(query, [dialing_code, number]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by phone number: ", error.message);
  }
};
