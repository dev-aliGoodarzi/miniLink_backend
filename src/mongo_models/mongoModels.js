"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortLinkModel = void 0;
// Mongoose
const mongoose_1 = __importDefault(require("mongoose"));
// Mongoose
// Schemas
const shortLinkSchema_1 = require("../mongo_schema/shortLinkSchema");
// Schemas
exports.ShortLinkModel = mongoose_1.default.model("linksCollection", shortLinkSchema_1.shortLinkSchema);
