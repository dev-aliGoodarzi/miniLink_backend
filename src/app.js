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
// Routes
const convertToShortLink_1 = require("./routes/convertToShortLink/convertToShortLink");
const convertToMainLink_1 = require("./routes/convertToMainLink/convertToMainLink");
const currentStatusRoutes_1 = require("./routes/status/currentStatus/currentStatusRoutes");
const shortStatusRoutes_1 = require("./routes/status/shortStatus/shortStatusRoutes");
// Routes
exports.app = (0, express_1.default)();
exports.isConnectedToDB = false;
// MiddleWares
exports.app.use(express_1.default.json());
exports.app.use(require("body-parser").urlencoded({ extended: false }));
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
exports.app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.app.use("/status-of-server", currentStatusRoutes_1.currentStatusRoutes);
exports.app.use("/status-of-server", shortStatusRoutes_1.shortStatusRoutes);
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
    .connect(`${String(process.env.MONGODB_PROTOCOL)}${String(process.env.DB_USERNAME)}:${String(process.env.DB_PASSWORD)}@${String(process.env.BACKEND_DB_IP)}/${String(process.env.DB_NAME)}`)
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
exports.app.listen(process.env.PORT, () => {
    console.log(`Server Is Running On Port ${process.env.PORT}`);
});
