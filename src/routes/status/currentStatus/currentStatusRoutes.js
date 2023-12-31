"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentStatusRoutes = void 0;
// Express
const express_1 = __importDefault(require("express"));
exports.currentStatusRoutes = express_1.default.Router();
exports.currentStatusRoutes.get("/current-status", (req, res) => { });
