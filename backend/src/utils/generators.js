import jwt from "jsonwebtoken";


export const generatePassword = (passwordLength = 10) => {
  const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialCharacters = "!@#$%^&*()_+";
  const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";

  const allCharacters = uppercaseCharacters + lowercaseCharacters + digits + specialCharacters;

  let password = "";
  password += uppercaseCharacters[Math.floor(Math.random() * uppercaseCharacters.length)];
  password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
  password += digits[Math.floor(Math.random() * digits.length)];

  for (let i = 3; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
};

export const generateToken = (user, secret, expiration) => {
  // console.log(user, secret, expiration);
  const accessToken = jwt.sign(user, secret, { expiresIn: expiration });
  return accessToken;
};
