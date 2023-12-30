// Env Attacher
import "dotenv/config";
// Env Attacher

// Express
import express from "express";
// Express

// Mongoose
import mongoose from "mongoose";
// Mongoose

// Routes
import { convertToShortLinkRouter } from "./routes/convertToShortLink/convertToShortLink";
import { convertToMainLink } from "./routes/convertToMainLink/convertToMainLink";
import { homeRouter } from "./routes/homeRouter/homeRouter";
// Routes

export const app = express();

app.use(express.json());
app.use(require("body-parser").urlencoded({ extended: false }));

app.use("/", convertToShortLinkRouter);
app.use("/", convertToMainLink);
app.use("/", homeRouter);

console.log();

mongoose
  .connect(
    `${String(process.env.MONGODB_PROTOCOL)}${String(
      process.env.DB_USERNAME
    )}:${String(process.env.DB_PASSWORD)}@${String(
      process.env.BACKEND_DB_IP
    )}/${String(process.env.DB_NAME)}`
  )
  .then(() => {
    console.clear();
    console.log("connected To DB successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server Is Running On Port ${process.env.PORT}`);
});
