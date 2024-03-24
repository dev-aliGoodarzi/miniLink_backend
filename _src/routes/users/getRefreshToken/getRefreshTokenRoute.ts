// Express
import express, { Request, Response } from "express";
// Express

// Models
import { UserModel } from "../../../mongo_models/mongoModels";
// Models

import jwt from "jsonwebtoken";

export const getRefreshTokenRoute = express.Router();

getRefreshTokenRoute.post(
  `/token/getNewToken`,
  async (req: Request, res: Response) => {
    const refreshToken = req.body["Auth-Refresh-Token"];

    try {
      if (!refreshToken) throw "رفرش توکن ارسال نشده";

      const selectedUser = await UserModel.findOne({ refreshToken });

      if (!selectedUser) throw "کاربر مورد نظر موجود نیست";

      const newUserToken = jwt.sign(
        { userId: selectedUser._id },
        process.env.SALT as string,
        {
          expiresIn: "1d",
        }
      );
      const newRefreshToken = jwt.sign(
        { userId: selectedUser._id },
        process.env.SALT as string,
        {
          expiresIn: "7d",
        }
      );

      await UserModel.findOneAndUpdate(
        {
          refreshToken,
        },
        {
          refreshToken: newRefreshToken,
          userToken: newUserToken,
        }
      );

      res.status(200).send({
        message: "عملیات موفق",
        data: {
          refreshToken: newRefreshToken,
          userToken: newUserToken,
        },
      });
    } catch (err) {
      res.status(403).send({
        message: "مشکلی هنگام بررسی توکن رخ داده",
        extraMessage: err,
      });
    }
  }
);
