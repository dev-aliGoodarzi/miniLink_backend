"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.serverRequestLogsSchema = exports.serverLogSchema = exports.shortLinkSchema = void 0;
const mongoose_1 = require("mongoose");
exports.shortLinkSchema = new mongoose_1.Schema({
    linkUrl: String,
    title: String,
    shortedLink: String,
    description: String,
});
exports.serverLogSchema = new mongoose_1.Schema({
    cpu: String,
    ram: String,
    disk: String,
    osInfo: String,
});
exports.serverRequestLogsSchema = new mongoose_1.Schema({
    logData: String,
});
exports.userSchema = new mongoose_1.Schema({
    name: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    userToken: String,
    refreshToken: String,
});
