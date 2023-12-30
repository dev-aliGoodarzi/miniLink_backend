"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRouter = void 0;
// Express
const express_1 = __importDefault(require("express"));
// Express
exports.homeRouter = express_1.default.Router();
exports.homeRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "server Is Normal",
    });
});
module.exports = exports.homeRouter;
