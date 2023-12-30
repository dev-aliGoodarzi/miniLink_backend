"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRouter = void 0;
const express_1 = __importDefault(require("express"));
const language_1 = require("../../languages/language");
exports.homeRouter = express_1.default.Router();
exports.homeRouter.get("/", (req, res) => {
    const { lang } = req.query;
    res.send(language_1.language[String(lang)] || language_1.language["en"]);
});
