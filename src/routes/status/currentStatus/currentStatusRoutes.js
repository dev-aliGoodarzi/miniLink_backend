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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentStatusRoutes = void 0;
// Express
const express_1 = __importDefault(require("express"));
// Express
const systeminformation_1 = __importDefault(require("systeminformation"));
exports.currentStatusRoutes = express_1.default.Router();
exports.currentStatusRoutes.get("/current-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const _cpu = await sw.cpu();
        const _mem = yield systeminformation_1.default.mem();
        // const _disk = await sw.diskLayout();
        // const _temps = await sw.cpuTemperature();
        // const cpuStatus = {
        //   brand: _cpu.brand,
        //   speed: _cpu.speed,
        //   cores: _cpu.cores,
        // };
        const memoryStatus = {
            memory: {
                usingMemory: _mem.used,
                totalMemory: _mem.total,
                freeMemory: _mem.free,
            },
            swap: {
                swapTotal: _mem.swaptotal,
                freeSwap: _mem.swapfree,
            },
        };
        // const temps = {
        //   cpu: {
        //     max: _temps.max,
        //   },
        // };
        // const diskStatus = {
        //   total: _disk,
        // };
        res.status(200).json({
            //   cpuStatus,
            memoryStatus,
            //   temps,
            //   diskStatus,
        });
    }
    catch (err) {
        res.status(403).json({
            error: {
                message: "مشکلی در خواندن اطلاعات به وجود آمده",
            },
        });
    }
}));
