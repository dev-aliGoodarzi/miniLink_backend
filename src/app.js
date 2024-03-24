"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConnectedToDB = exports.app = void 0;
// Env Attacher
require("dotenv/config");
// Env Attacher
// Express
const express_1 = __importDefault(require("express"));
// Express
// Mongoose
const mongoose_1 = __importDefault(require("mongoose"));
// Mongoose
// Modules
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Modules
// Routes
const convertToShortLink_1 = require("./routes/convertToShortLink/convertToShortLink");
const convertToMainLink_1 = require("./routes/convertToMainLink/convertToMainLink");
const currentStatusRoutes_1 = require("./routes/status/currentStatus/currentStatusRoutes");
const shortStatusRoutes_1 = require("./routes/status/shortStatus/shortStatusRoutes");
const StatusLogger_1 = require("./Logs/Loggers/Server/StatusLogger");
const statusSumary_1 = require("./routes/status/statusSumary/statusSumary");
const createUserRoute_1 = require("./routes/users/createUser/createUserRoute");
const loginUserRoute_1 = require("./routes/users/loginUser/loginUserRoute");
const getSingeUserRoute_1 = require("./routes/users/getSingeUser/getSingeUserRoute");
const getSelfProfileRoute_1 = require("./routes/profile/getSelfProfileRoute");
const logOutRoute_1 = require("./routes/users/logOut/logOutRoute");
const isUserLoggedInRoute_1 = require("./routes/users/isUserLoggedIn/isUserLoggedInRoute");
// Routes
// Middleware
const AddAllLogsMiddleware_1 = require("./middlewares/AddAllLogsMiddleware");
const checkIsAuthMiddleware_1 = require("./middlewares/checkIsAuthMiddleware");
const getRefreshTokenRoute_1 = require("./routes/users/getRefreshToken/getRefreshTokenRoute");
// Middleware
exports.app = (0, express_1.default)();
exports.isConnectedToDB = false;
// MiddleWares
const upload = (0, multer_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({ origin: "*" }));
exports.app.use(AddAllLogsMiddleware_1.AddAllLogsMiddleware);
exports.app.use(require("body-parser").urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
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
exports.app.use("/", convertToShortLink_1.convertToShortLinkRouter);
exports.app.use("/", convertToMainLink_1.convertToMainLink);
// User
exports.app.use("/", createUserRoute_1.createUser);
exports.app.use("/", upload.none(), loginUserRoute_1.loginUserRoute);
exports.app.use("/", checkIsAuthMiddleware_1.checkIsAuthMiddleware, getSingeUserRoute_1.getSingeUserRoute);
exports.app.use("/", checkIsAuthMiddleware_1.checkIsAuthMiddleware, getSelfProfileRoute_1.getSelfProfileRoute);
exports.app.use("/", checkIsAuthMiddleware_1.checkIsAuthMiddleware, logOutRoute_1.logOutRoute);
exports.app.use("/", checkIsAuthMiddleware_1.checkIsAuthMiddleware, isUserLoggedInRoute_1.isUserLoggedInRoute);
exports.app.use("/", checkIsAuthMiddleware_1.checkIsAuthMiddleware, getRefreshTokenRoute_1.getRefreshTokenRoute);
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
exports.app.get("/", checkIsAuthMiddleware_1.checkIsAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: exports.isConnectedToDB
            ? "سرور با موفقیت در حال کار است"
            : "اتصال به دیتابیس به مشکل خورده",
    });
}));
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
exports.app.use("/status-of-server/full", checkIsAuthMiddleware_1.checkIsAuthMiddleware, currentStatusRoutes_1.currentStatusRoutes);
exports.app.use("/status-of-server/short", checkIsAuthMiddleware_1.checkIsAuthMiddleware, shortStatusRoutes_1.shortStatusRoutes);
exports.app.use("/status-of-server/sumary", checkIsAuthMiddleware_1.checkIsAuthMiddleware, statusSumary_1.statusSumary);
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
mongoose_1.default
    .connect(
// `${String(process.env.MONGODB_PROTOCOL)}${String(
//   process.env.DB_USERNAME
// )}:${String(process.env.DB_PASSWORD)}@${String(
//   process.env.BACKEND_DB_IP
// )}/${String(process.env.DB_NAME)}`
"mongodb://localhost:27017/miniLink")
    .then(() => {
    console.clear();
    console.log("connected To DB successfully");
    exports.isConnectedToDB = true;
})
    .catch((err) => {
    console.log(err);
    exports.isConnectedToDB = false;
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
exports.app.use((req, res, next) => {
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
exports.app.listen(process.env.PORT, () => {
    console.log(`Server Is Running On Port ${process.env.PORT}`);
});
setInterval(() => {
    (0, StatusLogger_1.StatusLogger)();
}, 60000);
