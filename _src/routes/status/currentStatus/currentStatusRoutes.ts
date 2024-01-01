// Express
import express from "express";
// Express

const si = require("systeminformation");

export const currentStatusRoutes = express.Router();

currentStatusRoutes.get("/current-status", async (req, res) => {
  si.cpu()
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((err: any) => {
      res.status(413).json(err);
    });
});
