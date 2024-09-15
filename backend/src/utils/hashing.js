import bcrypt from "bcrypt";

/**
 * Hashes the provided password
 * 
 * @param {string} password - the password to be hashed
 * @param {number} saltRounds - the number of hashing rounds by default is 12
 * @returns {Promise<string>} a promise with hashed password
 */

export const hashPassword = async (password, saltRounds = 12) => {
    return await bcrypt.hash(password, saltRounds);
}