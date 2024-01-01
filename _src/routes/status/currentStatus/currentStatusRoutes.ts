// Express
import express from "express";
// Express

const si = require("systeminformation");

export const currentStatusRoutes = express.Router();

currentStatusRoutes.get("/current-status", async (req, res) => {
  try {
    const cpu = await si.cpu();
    const ram = await si.mem();
    const disk = await si.disk();
    const osInfo = await si.osInfo();
    res.status(200).json({
      cpu,
      ram,
      disk,
      osInfo,
    });
  } catch (err) {
    res.status(413).json(err);
  }
});
