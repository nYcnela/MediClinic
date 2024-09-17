/**
 * Generates a random password with provided length
 *
 * @param {number} passwordLength - the length of the password, set to 10 by default if not provided
 * @returns {string}  password generated of specified characters
 */
export const generatePassword = (passwordLength = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};
