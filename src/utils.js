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
