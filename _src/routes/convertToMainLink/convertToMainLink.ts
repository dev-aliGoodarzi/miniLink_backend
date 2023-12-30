import express from "express";
import { ShortLinkModel } from "../../mongo_models/mongoModels";

export const convertToMainLink = express.Router();

convertToMainLink.get("/get-mini-link", async (req, res) => {
  if (!req.body.shortLink)
    return res.status(400).json({
      message: "لینک کوتاه ارسال نشده",
    });

  const foundItem = await ShortLinkModel.findOne({
    shortedLink: req.body.shortLink,
  });

  if (!foundItem) {
    res.status(402).json({
      message: "لینک مورد نظر منقضی شده یا وجود ندارد",
    });
    return;
  }

  res.status(200).json({
    title: foundItem.title,
    link: foundItem.linkUrl,
  });
});
