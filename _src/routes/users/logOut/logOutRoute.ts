// Express
import express, { Request, Response } from "express";
// Express

// Models
import { UserModel } from "../../../mongo_models/mongoModels";
// Models

export const logOutRoute = express.Router();

logOutRoute.get("/logout", async (req: Request, res: Response) => {
  const myUser = await UserModel.findById(req.userId);
  try {
    if (!myUser) throw "همچین کاربری یافت نشد";
    if (myUser?.userToken === "") throw "شما قبلا خارج شدید از پروفایل خودتون";

    await UserModel.findByIdAndUpdate(
      { _id: req.userId },
      {
        userToken: "",
      }
    );
    res.status(200).send({ message: "شما با موفقیت خارج شدید" });
  } catch (err) {
    res.status(403).send({
      message: "مشکلی هنگام بررسی پروفایل رخ داده",
      extraMessage: err,
    });
  }
});
