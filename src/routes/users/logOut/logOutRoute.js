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
exports.logOutRoute = void 0;
// Express
const express_1 = __importDefault(require("express"));
// Express
// Models
const mongoModels_1 = require("../../../mongo_models/mongoModels");
// Models
exports.logOutRoute = express_1.default.Router();
exports.logOutRoute.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myUser = yield mongoModels_1.UserModel.findById(req.userId);
    try {
        if (!myUser)
            throw "همچین کاربری یافت نشد";
        if ((myUser === null || myUser === void 0 ? void 0 : myUser.userToken) === "")
            throw "شما قبلا خارج شدید از پروفایل خودتون";
        yield mongoModels_1.UserModel.findByIdAndUpdate({ _id: req.userId }, {
            userToken: "",
        });
        res.status(200).send({ message: "شما با موفقیت خارج شدید" });
    }
    catch (err) {
        res.status(403).send({
            message: "مشکلی هنگام بررسی پروفایل رخ داده",
            extraMessage: err,
        });
    }
}));
