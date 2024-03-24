"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ServerRequestLogsModel = exports.LogStatusModel = exports.ShortLinkModel = void 0;
// Mongoose
const mongoose_1 = __importDefault(require("mongoose"));
// Mongoose
// Schemas
const shortLinkSchema_1 = require("../mongo_schema/shortLinkSchema");
// Schemas
exports.ShortLinkModel = mongoose_1.default.model("links_Collection", shortLinkSchema_1.shortLinkSchema);
exports.LogStatusModel = mongoose_1.default.model("server_LogCollection", shortLinkSchema_1.serverLogSchema);
exports.ServerRequestLogsModel = mongoose_1.default.model("server_Requests_Logs", shortLinkSchema_1.serverRequestLogsSchema);
exports.UserModel = mongoose_1.default.model("users", shortLinkSchema_1.userSchema);
