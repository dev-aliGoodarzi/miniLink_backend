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
exports.convertToMainLink = void 0;
const express_1 = __importDefault(require("express"));
const mongoModels_1 = require("../../mongo_models/mongoModels");
exports.convertToMainLink = express_1.default.Router();
exports.convertToMainLink.get("/get-mini-link", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.shortLink)
        return res.status(400).json({
            message: "لینک کوتاه ارسال نشده",
        });
    const foundItem = yield mongoModels_1.ShortLinkModel.findOne({
        shortedLink: req.body.shortLink,
    });
    if (!foundItem) {
        res.status(402).json({
            message: "لینک مورد نظر منقضی شده یا وجود ندارد",
        });
        return;
    }
    res.status(200).json({
        title: foundItem.title,
        link: foundItem.linkUrl,
    });
}));
