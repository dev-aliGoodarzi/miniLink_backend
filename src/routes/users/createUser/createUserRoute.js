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
exports.createUser = void 0;
// Express
const express_1 = __importDefault(require("express"));
// Express
// Models
const mongoModels_1 = require("../../../mongo_models/mongoModels");
// Models
// Utils
const isValid_1 = require("../../../utils/isValid");
// Utils
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createUser = express_1.default.Router();
exports.createUser.post("/user/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, email, name, lastName } = req.body;
    try {
        (0, isValid_1.isValid)({
            key: "userName",
            value: userName,
        }, "string");
        (0, isValid_1.isValid)({
            key: "password",
            value: password,
        }, "string");
        (0, isValid_1.isValid)({
            key: "email",
            value: email,
        }, "string");
        (0, isValid_1.isValid)({
            key: "name",
            value: name,
        }, "string");
        (0, isValid_1.isValid)({
            key: "lastName",
            value: lastName,
        }, "string");
        const byEmail = yield mongoModels_1.UserModel.findOne({
            email,
        });
        const byUserName = yield mongoModels_1.UserModel.findOne({
            userName,
        });
        if (byEmail) {
            throw "ایمیل وارد شده تکراری است";
        }
        if (byUserName) {
            throw "نام کاربری وارد شده تکراری است";
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new mongoModels_1.UserModel({
            userName,
            password: hashedPassword,
            email,
            name,
            lastName,
        });
        yield newUser.save();
        const userToken = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.SALT, {
            expiresIn: "1d",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.SALT, {
            expiresIn: "7d",
        });
        yield mongoModels_1.UserModel.findOneAndUpdate({ email }, {
            userToken,
            refreshToken,
        });
        res.status(200).send({
            message: "کاربر با موفقیت ایجاد شد",
            userToken,
            refreshToken,
        });
    }
    catch (err) {
        res.status(422).send({
            message: "مشکلی هنگام ایجاد کاربر رخ داده",
            extraMessage: err,
        });
    }
}));
