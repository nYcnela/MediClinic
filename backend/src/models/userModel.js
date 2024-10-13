import db from "../config/dbConnection.js";

/**
 * Creates a new user in the user's table
 *
 * @param {string} pesel - user's PESEL number
 * @param {string} name - user's first name
 * @param {string} surname - user's last name
 * @param {string} email - user's email adress
 * @param {string} dialingCode - user's dialing code
 * @param {string} phoneNumber - user's phone number
 * @param {string} password - user's hashed password
 * @param {string} role - user's role
 * @param {Object} client - the database connection client used to execute the query
 * @returns {Promise<number>} - Returns created user's ID, returns -1 if an error occurs
 */
export const createNewUser = async (pesel, name, surname, email, dialingCode, phoneNumber, password, role, client) => {
  try {
    const data = [role, pesel, name, surname, email, dialingCode, phoneNumber, password];
    const query = `INSERT INTO users (role, pesel, name, surname, email, dialing_code, phone_number, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    // console.log(data);
    // console.log(query);
    const result = await client.query(query, data);
    return result.rows[0].id;
  } catch (error) {
    console.log(`Error adding user to database: ${error.message}`);
    return -1;
  }
};

/**
 * Function to register a user transactionally
 *
 * If no external client is provided function creates a new data base connection
 *
 * @param {Object} userdata - the user's basic data
 * @param {string} role - users's role
 * @param {Object|null} externalClient - optional, database client used to manage the transaction
 * @returns {Promise<number>}  Returns created user's ID, returns -1 if an error occurs
 */
export const registerUserTransaction = async (userdata, role, externalClient = null) => {
  const { name, surname, pesel, email, dialingCode, phoneNumber, password } = userdata;
  let client = externalClient;

  try {
    if (!client) {
      client = await db.connect();
      await client.query("BEGIN");
    }

    const user = await findUserByPesel(pesel, client);
    if (user) {
      throw new Error("User with this PESEL already exists");
    }

    const result = await createNewUser(pesel, name, surname, email, dialingCode, phoneNumber, password, role, client);

    if (!externalClient) {
      await client.query("COMMIT");
    }

    return result;
  } catch (error) {
    if (!externalClient && client) {
      await client.query("ROLLBACK");
    }
    throw error;
  } finally {
    if (!externalClient && client) {
      client.release();
    }
  }
};

export const fetchUser = async (userId) => {
  const client = await db.connect();
  try {
    const query = "SELECT id, name, surname FROM users WHERE id = $1";
    const user = await client.query(query, [userId]);
    return user.rows[0];
  } catch (error) {
    console.log("Error selecting user by id: ", error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 *
 * @param {string} email - user's email adress
 * @param {Object} [client = db] - the data base connection client used to execute the query. defaults to the global 'db' client
 * @returns {Promise<Object>|null} return user's data if found
 */
export const findUserByEmail = async (email, client = db) => {
  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    // console.log(query);
    const result = await client.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by username: ", error.message);
  }
};

/**
 *
 * @param {string} pesel - user's PESEL
 * @param {Object} [client = db] - the data base connection client used to execute the query. defaults to the global 'db' client
 * @returns {Promise<Object>|null} return user's data if found
 */
export const findUserByPesel = async (pesel, client = db) => {
  try {
    const query = "SELECT * FROM users WHERE pesel = $1";
    const result = await client.query(query, [pesel]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by pesel: ", error.message);
  }
};

/**
 *
 * @param {string} dialing_code - user's dialing code
 * @param {string} number - user's phone number
 * @param {Object} [client = db] - the data base connection client used to execute the query. defaults to the global 'db' client
 * @returns {Promise<Object>|null} return user's data if found
 */
export const findUserByPhoneNumber = async (dialing_code, number, client = db) => {
  try {
    const query = "SELECT * FROM users WHERE dialing_code = $1 AND phone_number = $2";
    const result = await client.query(query, [dialing_code, number]);
    return result.rows[0];
  } catch (error) {
    console.log("Error finding user by phone number: ", error.message);
  }
};

export const deleteUser = async (userId) => {
  const client = await db.connect();
  try {
    const query = "DELETE FROM users WHERE id = $1";
    const response = await client.query(query, [userId]);
    return response.rowCount;
  } catch (error) {
    console.log("Error deleting user", error.message);
    throw error;
  } finally {
    client.release();
  }
};
