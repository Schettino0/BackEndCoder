import {mongoose} from "mongoose";
import { dbAdmin, dbPassword, dbHost } from "../../config/db.config.js";

export const connectionString =`mongodb+srv://${dbAdmin}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority` 
export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};
