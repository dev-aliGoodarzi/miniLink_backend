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
exports.loginUserRoute = void 0;
// Express
const express_1 = __importDefault(require("express"));
// Express
// Models
const mongoModels_1 = require("../../../mongo_models/mongoModels");
// Models
// Utils
const isValid_1 = require("../../../utils/isValid");
// Utils
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.loginUserRoute = express_1.default.Router();
exports.loginUserRoute.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        if (userName.length < 8 || password.length < 8) {
            throw "طول نام کاربری و رمز عبور از حد مجاز کمتر است";
        }
        (0, isValid_1.isValid)({
            key: "userName",
            value: userName,
        }, "string");
        (0, isValid_1.isValid)({
            key: "password",
            value: password,
        }, "string");
        const user = yield mongoModels_1.UserModel.findOne({
            userName,
        });
        if (!user) {
            res.status(404).send({
                message: "کاربر مورد نظر موجود نیست",
            });
        }
        else {
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (passwordMatch) {
                const userToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SALT, {
                    expiresIn: "1h",
                });
                const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SALT, {
                    expiresIn: "7d",
                });
                yield mongoModels_1.UserModel.findOneAndUpdate({
                    userName,
                }, {
                    userToken,
                    refreshToken,
                });
                res
                    .status(200)
                    .cookie("userToken", userToken, {
                    secure: false,
                    sameSite: "none",
                    path: "/",
                    domain: "localhost",
                })
                    .send({
                    userToken,
                    refreshToken: refreshToken,
                });
            }
            else {
                res.status(403).send({
                    message: "نام کاربری یا رمز عبور اشتباه است",
                });
            }
        }
    }
    catch (err) {
        res.status(422).send({
            message: "مشکلی هنگام بررسی کاربر رخ داده",
            extraMessage: err,
        });
    }
}));
