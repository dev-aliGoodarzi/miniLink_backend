import express from "express";
import { language } from "../../languages/language";

export const convertToShortLinkRouter = express.Router();

homeRouter.get("/", (req, res) => {
  const { lang } = req.query;
  res.send(language[String(lang)] || language["en"]);
});
