// Express
import express from "express";
// Express

const si = require("systeminformation");

export const shortStatusRoutes = express.Router();

shortStatusRoutes.get("/short-status", async (req, res) => {
  try {
    const cpu = await si.cpu();
    const ram = await si.mem();

    res.status(200).json({
      cpu,
      ram,
    });
  } catch (err) {
    res.status(416).json(err);
  }
});
