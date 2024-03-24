// Env Attacher
import "dotenv/config";
// Env Attacher

// Express
import express from "express";
// Express

// Mongoose
import mongoose from "mongoose";
// Mongoose

// Modules
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

// Modules

// Routes
import { convertToShortLinkRouter } from "./routes/convertToShortLink/convertToShortLink";
import { convertToMainLink } from "./routes/convertToMainLink/convertToMainLink";
import { currentStatusRoutes } from "./routes/status/currentStatus/currentStatusRoutes";
import { shortStatusRoutes } from "./routes/status/shortStatus/shortStatusRoutes";
import { StatusLogger } from "./Logs/Loggers/Server/StatusLogger";
import { statusSumary } from "./routes/status/statusSumary/statusSumary";
import { createUser } from "./routes/users/createUser/createUserRoute";
import { loginUserRoute } from "./routes/users/loginUser/loginUserRoute";
import { getSingeUserRoute } from "./routes/users/getSingeUser/getSingeUserRoute";
import { getSelfProfileRoute } from "./routes/profile/getSelfProfileRoute";
import { logOutRoute } from "./routes/users/logOut/logOutRoute";
import { isUserLoggedInRoute } from "./routes/users/isUserLoggedIn/isUserLoggedInRoute";
// Routes

// Middleware
import { AddAllLogsMiddleware } from "./middlewares/AddAllLogsMiddleware";
import { checkIsAuthMiddleware } from "./middlewares/checkIsAuthMiddleware";
import { getRefreshTokenRoute } from "./routes/users/getRefreshToken/getRefreshTokenRoute";
// Middleware

export const app = express();
export let isConnectedToDB: boolean = false;

// MiddleWares

const upload = multer();

app.use(express.json());

app.use(cors({ origin: "*" }));
app.use(AddAllLogsMiddleware);
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(cookieParser());
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
// User
app.use("/", createUser);
app.use("/", upload.none(), loginUserRoute);
app.use("/", checkIsAuthMiddleware, getSingeUserRoute);
app.use("/", checkIsAuthMiddleware, getSelfProfileRoute);
app.use("/", checkIsAuthMiddleware, logOutRoute);
app.use("/", checkIsAuthMiddleware, isUserLoggedInRoute);
app.use("/", checkIsAuthMiddleware, getRefreshTokenRoute);
// User
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
app.get("/", checkIsAuthMiddleware, async (req, res) => {
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
app.use("/status-of-server/full", checkIsAuthMiddleware, currentStatusRoutes);
app.use("/status-of-server/short", checkIsAuthMiddleware, shortStatusRoutes);
app.use("/status-of-server/sumary", checkIsAuthMiddleware, statusSumary);
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
    // `${String(process.env.MONGODB_PROTOCOL)}${String(
    //   process.env.DB_USERNAME
    // )}:${String(process.env.DB_PASSWORD)}@${String(
    //   process.env.BACKEND_DB_IP
    // )}/${String(process.env.DB_NAME)}`
    "mongodb://localhost:27017/miniLink"
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
// 404
app.use((req, res, next) => {
  res.status(404).send({ message: "مسیر مورد نظر پیدا نشد" });
});
// 404
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

setInterval(() => {
  StatusLogger();
}, 60000);

declare global {
  namespace Express {
    interface Request {
      userId?: string; // or whatever type userId should be
    }
  }
}
