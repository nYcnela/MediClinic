import db from "../config/dbConnection.js"


export const findUserByEmail = async (username) => {
    try{
        const query = "SELECT username, password FROM users WHERE username = $1";
        const result = await db.query(query, [username])
        return result.rows[0]
    }catch(error){
        console.log("Error finding user by username: ", error.message);
    }
}

export const findUserByPesel = async (pesel) => {
    try{
        const query = "SELECT * FROM users WHERE pesel = $1"
        const result = await db.query(query, [pesel])
        return result.rows[0]
    }catch(error){
        console.log("Error finding user by pesel: ", error.message)
    }
}

export const findUserByPhoneNumber = async (number) => {
    try{
        const query = "SELECT * FROM users WHERE phone_number = $1"
        const result = await db.query(query, [number])
        return result.rows[0]
    }catch(error){
        console.log("Error finding user by phone number: ", error.message);
    }
}