// Express
import express from "express";
// Express

const si = require("systeminformation");

export const currentStatusRoutes = express.Router();

currentStatusRoutes.get("/current-status", async (req, res) => {
  try {
    const _cpu = await si.cpu();
    res.status(200).json(_cpu);
  } catch (err) {
    res.status(413).json(err);
  }
});
