// Express
import express, { Request, Response } from "express";
// Express

// Models
import { UserModel } from "../../../mongo_models/mongoModels";
// Models

export const isUserLoggedInRoute = express.Router();

isUserLoggedInRoute.get(
  "/token/is-valid",
  async (req: Request, res: Response) => {
    try {
      const myUser = await UserModel.findById(req.userId);

      if (!myUser) throw "همچین کاربری یافت نشد";
      if (myUser?.userToken === "")
        throw "شما قبلا خارج شدید از پروفایل خودتون";

      res.status(200).send({ message: "توکن شما هنوز معتبر است" });
    } catch (err) {
      res.status(403).send({
        message: "مشکلی هنگام بررسی پروفایل رخ داده",
        extraMessage: err,
      });
    }
  }
);
