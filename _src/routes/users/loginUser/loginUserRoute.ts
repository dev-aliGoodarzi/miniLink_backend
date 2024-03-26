// Express
import express, { Request } from "express";
// Express

// Models
import { UserModel } from "../../../mongo_models/mongoModels";
// Models

// Utils
import { isValid } from "../../../utils/isValid";
// Utils

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUserRoute = express.Router();

loginUserRoute.post("/user/login", async (req: Request, res) => {
  const { userName, password } = req.body;

  try {
    if (userName.length < 8 || password.length < 8) {
      throw "طول نام کاربری و رمز عبور از حد مجاز کمتر است";
    }
    isValid(
      {
        key: "userName",
        value: userName,
      },
      "string"
    );

    isValid(
      {
        key: "password",
        value: password,
      },
      "string"
    );
    const user = await UserModel.findOne({
      userName,
    });

    if (!user) {
      res.status(404).send({
        message: "کاربر مورد نظر موجود نیست",
      });
    } else {
      const passwordMatch = await bcrypt.compare(
        password,
        user.password as string
      );
      if (passwordMatch) {
        const userToken = jwt.sign(
          { userId: user._id },
          process.env.SALT as string,
          {
            expiresIn: "1h",
          }
        );
        const refreshToken = jwt.sign(
          { userId: user._id },
          process.env.SALT as string,
          {
            expiresIn: "7d",
          }
        );
        await UserModel.findOneAndUpdate(
          {
            userName,
          },
          {
            userToken,
            refreshToken,
          }
        );
        res
          .status(200)
          .cookie("userToken", userToken, {
            secure: false,
            sameSite: "none",
            path: "/",
            domain: "localhost",
          })
          .send({
            userToken,
            refreshToken: refreshToken,
          });
      } else {
        res.status(403).send({
          message: "نام کاربری یا رمز عبور اشتباه است",
        });
      }
    }
  } catch (err) {
    res.status(422).send({
      message: "مشکلی هنگام بررسی کاربر رخ داده",
      extraMessage: err,
    });
  }
});
