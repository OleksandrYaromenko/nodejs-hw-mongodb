import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function initMongoConnection() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;

  if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
    throw new Error(
      "Missing MongoDB connection details in environment variables"
    );
  }

  const connectionString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString);
    console.log("Database connection successfully");
  } catch (error) {
    console.error(error);
  }
}
export { initMongoConnection };
