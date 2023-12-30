"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortLinkSchema = void 0;
const mongoose_1 = require("mongoose");
exports.shortLinkSchema = new mongoose_1.Schema({
    linkUrl: String,
    title: String,
});
