import dotenv from "dotenv";
dotenv.config();

const { PORT, HOST, MONGODB_URI, JWT_SECRET } = process.env;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!HOST) {
  throw new Error("HOST is not defined in environment variables");
}

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export default {
  PORT,
  HOST,
  MONGODB_URI,
  JWT_SECRET,
};
