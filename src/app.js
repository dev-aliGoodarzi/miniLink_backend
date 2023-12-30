"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
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
// Routes
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(require("body-parser").urlencoded({ extended: false }));
exports.app.use("/", convertToShortLink_1.convertToShortLinkRouter);
exports.app.use("/", convertToMainLink_1.convertToMainLink);
console.log();
mongoose_1.default
    .connect(`${String(process.env.MONGODB_PROTOCOL)}${String(process.env.DB_USERNAME)}:${String(process.env.DB_PASSWORD)}@${String(process.env.BACKEND_DB_IP)}/${String(process.env.DB_NAME)}`)
    .then(() => {
    console.clear();
    console.log("connected To DB successfully");
})
    .catch((err) => {
    console.log(err);
});
exports.app.listen(process.env.PORT, () => {
    console.log(`Server Is Running On Port ${process.env.PORT}`);
});
