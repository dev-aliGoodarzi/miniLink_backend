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
import { currentStatusRoutes } from "./routes/status/currentStatus/currentStatusRoutes";
import { shortStatusRoutes } from "./routes/status/shortStatus/shortStatusRoutes";
// Routes

export const app = express();
export let isConnectedToDB: boolean = false;

// MiddleWares
app.use(express.json());
app.use(require("body-parser").urlencoded({ extended: false }));
// MiddleWares
/**
 *
 *
 *
 *
 *
 *
 *
 */
// Main Routes
app.use("/", convertToShortLinkRouter);
app.use("/", convertToMainLink);
// Main Routes
/**
 *
 *
 *
 *
 *
 *
 *
 */
// HomeRouter
app.get("/", async (req, res) => {
  res.status(200).json({
    message: isConnectedToDB
      ? "سرور با موفقیت در حال کار است"
      : "اتصال به دیتابیس به مشکل خورده",
  });
});
// HomeRouter
/**
 *
 *
 *
 *
 *
 *
 *
 */
// Server Status
app.use("/status-of-server", currentStatusRoutes);
app.use("/status-of-server", shortStatusRoutes);
// Server Status
/**
 *
 *
 *
 *
 *
 *
 *
 */
// DB Connector
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
    isConnectedToDB = true;
  })
  .catch((err) => {
    console.log(err);
    isConnectedToDB = false;
  });
// DB Connector
/**
 *
 *
 *
 *
 *
 *
 *
 */

app.listen(process.env.PORT, () => {
  console.log(`Server Is Running On Port ${process.env.PORT}`);
});
