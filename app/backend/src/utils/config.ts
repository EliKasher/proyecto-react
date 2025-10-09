import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const MONGODB_URI =  process.env.MONGODB_URI


export default { PORT, MONGODB_URI, HOST };