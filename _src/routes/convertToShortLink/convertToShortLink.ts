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

  const { linkUrl, title, description } = body;

  if (!linkUrl) {
    res.status(412).send({
      message: "لینک ارسال نشده",
    });
    return;
  }

  if (!title) {
    res.status(412).send({
      message: "نام ارسال نشده",
    });
    return;
  }

  if (!description) {
    res.status(412).send({
      message: "توضیحات ارسال نشده",
    });
    return;
  }

  let shortedLink = randomCharGenerator(20);
  let isDupplicate = false;
  /** */
  /** */
  /** */
  /** */
  /** */
  // CHECK IF WE HAVE DUPPLICATE LINK ID
  do {
    const foundItem = await ShortLinkModel.findOne({
      shortedLink,
    });
    if (foundItem) {
      shortedLink = randomCharGenerator(30);
      isDupplicate = true;
    } else {
      isDupplicate = false;
      shortedLink = randomCharGenerator(20);
    }
  } while (isDupplicate);
  // CHECK IF WE HAVE DUPPLICATE LINK ID
  /** */
  /** */
  /** */
  /** */
  /** */
  const NewLink = new ShortLinkModel({
    linkUrl,
    title,
    shortedLink,
    description,
  });

  await NewLink.save();
  res.status(200).json({
    code: 200,
    message: "عملیات موفق",
    data: {
      _id: NewLink._id,
      shortedLink: NewLink.shortedLink,
      linkUrl: NewLink.linkUrl,
      title: NewLink.title,
      description: NewLink.description,
    },
  });
  res.send();
});
