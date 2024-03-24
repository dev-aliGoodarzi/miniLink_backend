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
exports.getCurrStatus = void 0;
const si = require("systeminformation");
const getCurrStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cpu = yield si.cpu();
        const ram = yield si.mem();
        const disk = yield si.diskLayout();
        const osInfo = yield si.osInfo();
        return {
            cpu: JSON.stringify(cpu),
            ram: JSON.stringify(ram),
            disk: JSON.stringify(disk),
            osInfo: JSON.stringify(osInfo),
        };
    }
    catch (err) {
        return {
            cpu: JSON.stringify("null"),
            ram: JSON.stringify("null"),
            disk: JSON.stringify("null"),
            osInfo: JSON.stringify("null"),
        };
    }
});
exports.getCurrStatus = getCurrStatus;
