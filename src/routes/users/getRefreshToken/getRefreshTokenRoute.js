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
exports.getRefreshTokenRoute = void 0;
// Express
const express_1 = __importDefault(require("express"));
// Express
// Models
const mongoModels_1 = require("../../../mongo_models/mongoModels");
// Models
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.getRefreshTokenRoute = express_1.default.Router();
exports.getRefreshTokenRoute.post(`/token/getNewToken`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body["Auth-Refresh-Token"];
    try {
        if (!refreshToken)
            throw "رفرش توکن ارسال نشده";
        const selectedUser = yield mongoModels_1.UserModel.findOne({ refreshToken });
        if (!selectedUser)
            throw "کاربر مورد با رفرش توکن ارسالی نظر موجود نیست";
        const newUserToken = jsonwebtoken_1.default.sign({ userId: selectedUser._id }, process.env.SALT, {
            expiresIn: "1d",
        });
        const newRefreshToken = jsonwebtoken_1.default.sign({ userId: selectedUser._id }, process.env.SALT, {
            expiresIn: "7d",
        });
        yield mongoModels_1.UserModel.findOneAndUpdate({
            refreshToken,
        }, {
            refreshToken: newRefreshToken,
            userToken: newUserToken,
        });
        res.status(200).send({
            message: "عملیات موفق",
            data: {
                refreshToken: newRefreshToken,
                userToken: newUserToken,
            },
        });
    }
    catch (err) {
        res.status(403).send({
            message: "مشکلی هنگام بررسی توکن رخ داده",
            extraMessage: err,
        });
    }
}));
