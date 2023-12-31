// Express
import express from "express";
// Express

import sw from "systeminformation";

export const currentStatusRoutes = express.Router();

currentStatusRoutes.get("/current-status", async (req, res) => {
  try {
    const _cpu = await sw.cpu();
    const _mem = await sw.mem();
    const _disk = await sw.diskLayout();
    // const _temps = await sw.cpuTemperature();
    const cpuStatus = {
      brand: _cpu.brand,
      speed: _cpu.speed,
      cores: _cpu.cores,
    };
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
    const diskStatus = {
      total: _disk,
    };

    res.status(200).json({
      cpuStatus,
      memoryStatus,
      //   temps,
      diskStatus,
    });
  } catch (err) {
    res.status(403).json({
      error: {
        message: "مشکلی در خواندن اطلاعات به وجود آمده",
      },
    });
  }
});
