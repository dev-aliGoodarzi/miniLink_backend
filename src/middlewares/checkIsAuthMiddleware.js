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
exports.checkIsAuthMiddleware = void 0;
// Express
// JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// JWT
// Models
const mongoModels_1 = require("../mongo_models/mongoModels");
// Models
const checkIsAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("Authorization") || req.cookies.userToken;
    console.log(token);
    if (!token)
        return res.status(401).json({ error: "توکن وارد نشده" });
    try {
        const isActiveToken = yield mongoModels_1.UserModel.findOne({ userToken: token });
        if (!isActiveToken) {
            throw "توکن غیر قابل شناسایی است و معتبر نمیباشد .";
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SALT);
        req.userId = String(decoded.userId);
        next();
    }
    catch (err) {
        res.status(401).json({ error: err || "توکن نامعتبر" });
    }
});
exports.checkIsAuthMiddleware = checkIsAuthMiddleware;
