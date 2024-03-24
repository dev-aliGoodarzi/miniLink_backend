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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusLogger = void 0;
const mongoModels_1 = require("../../../mongo_models/mongoModels");
// Models
// Utils
const getCurrStatus_1 = require("../../../utils/getCurrStatus");
// Utils
const StatusLogger = () => __awaiter(void 0, void 0, void 0, function* () {
    const log = (yield (0, getCurrStatus_1.getCurrStatus)());
    const NewLink = new mongoModels_1.LogStatusModel(log);
    yield NewLink.save();
});
exports.StatusLogger = StatusLogger;
