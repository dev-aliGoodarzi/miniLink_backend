"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonRouter = void 0;
const express_1 = __importDefault(require("express"));
const common_1 = require("../../languages/common/common");
exports.commonRouter = express_1.default.Router();
exports.commonRouter.get("/common", (req, res) => {
    const { lang } = req.query;
    res.json(common_1.commonLanguage[String(lang)] || common_1.commonLanguage["en"]);
    res.send;
});
