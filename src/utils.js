import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

import { hashSync, genSaltSync, compareSync } from "bcrypt";

export const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

export const isValidPass = (password, user) => {
  return compareSync(password, user.password);
};

export const generateRandomCode = (length) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  while (code.length < length) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    const randomChar = charset.charAt(randomIndex);

    if (code.indexOf(randomChar) === -1) {
      // El carácter no está repetido, añádelo al código
      code += randomChar;
    }
  }
  return code;
};
