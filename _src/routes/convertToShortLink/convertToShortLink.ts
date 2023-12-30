// Express
import express from "express";
// Express

import { ShortLinkModel } from "../../mongo_models/mongoModels";
import { randomCharGenerator } from "../../utils/randomCharGenerator";

export const convertToShortLinkRouter = express.Router();

convertToShortLinkRouter.post("/convert-to-short-link", async (req, res) => {
  const { body } = req;
  if (!body?.linkUrl) {
    res.status(400).json({
      message: {
        linkUrl: "آدرس لینک با فرمت درستی ارسال نشده",
      },
    });
    res.send();
    return;
  }
  if (!body?.title) {
    res.status(400).json({
      message: {
        title: "نام لینک به صورت درست ارسال نشده",
      },
    });
    res.send();
    return;
  }

  const { linkUrl, title } = body;

  console.log(linkUrl);

  const NewLink = new ShortLinkModel({
    linkUrl,
    title,
    shortedLink: randomCharGenerator(19),
  });

  await NewLink.save();
  // .then(() => {
  res.status(200).json({
    code: 200,
    message: "عملیات موفق",
    data: {
      shortedLink: NewLink.shortedLink,
      linkUrl: NewLink.linkUrl,
      title: NewLink.title,
    },
  });
  res.send();

  // })
  // .catch(() => {
  //   res.status(402).json({
  //     code: 402,
  //     message: "error ",
  //   });
  // });
});
