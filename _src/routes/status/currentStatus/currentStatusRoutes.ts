// Express
import express from "express";
// Express

// Utils
import { getCurrStatus } from "../../../utils/getCurrStatus";
// Utils

export const currentStatusRoutes = express.Router();

currentStatusRoutes.get("/", async (req, res) => {
  const _res = getCurrStatus();
  res.status(200).json(_res);
});
