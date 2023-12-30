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
exports.convertToShortLinkRouter = void 0;
// Express
const express_1 = __importDefault(require("express"));
// Express
const mongoModels_1 = require("../../mongo_models/mongoModels");
const randomCharGenerator_1 = require("../../utils/randomCharGenerator");
exports.convertToShortLinkRouter = express_1.default.Router();
exports.convertToShortLinkRouter.post("/convert-to-short-link", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!(body === null || body === void 0 ? void 0 : body.linkUrl)) {
        res.status(400).json({
            message: {
                linkUrl: "آدرس لینک با فرمت درستی ارسال نشده",
            },
        });
        res.send();
        return;
    }
    if (!(body === null || body === void 0 ? void 0 : body.title)) {
        res.status(400).json({
            message: {
                title: "نام لینک به صورت درست ارسال نشده",
            },
        });
        res.send();
        return;
    }
    const { linkUrl, title } = body;
    console.log(linkUrl);
    const NewLink = new mongoModels_1.ShortLinkModel({
        linkUrl,
        title,
        shortedLink: (0, randomCharGenerator_1.randomCharGenerator)(19),
    });
    yield NewLink.save();
    // .then(() => {
    res.status(200).json({
        code: 200,
        message: "عملیات موفق",
        data: {
            shortedLink: NewLink.shortedLink,
            linkUrl: NewLink.linkUrl,
            title: NewLink.title,
        },
    });
    res.send();
    // })
    // .catch(() => {
    //   res.status(402).json({
    //     code: 402,
    //     message: "error ",
    //   });
    // });
}));
