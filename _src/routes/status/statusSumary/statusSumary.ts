// Express
import express from "express";
import { LogStatusModel } from "../../../mongo_models/mongoModels";
// Express

export const statusSumary = express.Router();

statusSumary.get("/", async (req, res) => {
  const foundItem = await LogStatusModel.find();
  res.status(200).json(foundItem);
});
