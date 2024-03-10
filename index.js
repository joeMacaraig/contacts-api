//imports
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

//import routes
import { contactRouter } from "./routes/contact.routes.js";

//dotenv | dotenv items
dotenv.config();
const PORT = process.env.PORT;
const DB = process.env.DB;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(contactRouter);

//database connect
mongoose
  .set("strictQuery", false)
  .connect(DB, { dbName: "Contact" })
  .then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
  .catch((error) => console.log(error));
