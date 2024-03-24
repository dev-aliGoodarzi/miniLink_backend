// Express
import express, { Request, Response } from "express";
// Express

// Models
import { UserModel } from "../../mongo_models/mongoModels";
// Models

export const getSelfProfileRoute = express.Router();

getSelfProfileRoute.get(`/profile`, async (req: Request, res: Response) => {
  const myUser = await UserModel.findById(req.userId);

  if (!myUser) throw "فاقد پروفایل";

  res.status(200).send({ data: myUser });

  try {
  } catch (err) {
    res.status(403).send({
      message: "مشکلی هنگام بررسی پروفایل رخ داده",
      extraMessage: err,
    });
  }
});
