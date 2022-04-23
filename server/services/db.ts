import "dotenv/config.js";
import mongoose from "mongoose";

export default async () => {
  try {
    const DB: string = process.env.DB_PATH!;
    await mongoose.connect(DB);
    console.info("INFO - Database connected");
  } catch (err) {
    console.error("ERROR - Unable to connect to the database:", err);
  }
};
