import db from "../config/dbConnection.js"


export const findUserByUsername = async (username) => {
    try{
        const query = "SELECT username, password FROM users WHERE username = $1";
        const result = await db.query(query, [username])
        return result.rows[0]
    }catch(error){
        console.log("Error finding user by username: ", error.message);
    }
}