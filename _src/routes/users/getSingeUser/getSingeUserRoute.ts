// Express
import express, { Request, Response } from "express";
// Express

// Models
import { UserModel } from "../../../mongo_models/mongoModels";
// Models

export const getSingeUserRoute = express.Router();

getSingeUserRoute.get(
  `/users/get-single-user/:userName`,
  async (req: Request, res: Response) => {
    const { userName } = req.params;
    try {
      if (String(userName).length < 5)
        throw "طول نام کاربری از حد مجاز کمتر است";

      const selectedUser = await UserModel.findOne({ userName });

      if (!selectedUser) throw "کاربر مورد نظر پیدا نشد ";

      res.status(200).send({
        userData: selectedUser,
      });
    } catch (err) {
      res.status(403).send({
        message: "مشکلی هنگام بررسی کاربر رخ داده",
        extraMessage: err,
      });
    }
  }
);
