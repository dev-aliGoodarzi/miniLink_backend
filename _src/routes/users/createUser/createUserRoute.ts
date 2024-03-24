// Express
import express from "express";
// Express

// Models
import { UserModel } from "../../../mongo_models/mongoModels";
// Models

// Utils
import { isValid } from "../../../utils/isValid";
// Utils

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = express.Router();

createUser.post("/user/register", async (req, res) => {
  const { userName, password, email, name, lastName } = req.body;

  try {
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
    isValid(
      {
        key: "email",
        value: email,
      },
      "string"
    );
    isValid(
      {
        key: "name",
        value: name,
      },
      "string"
    );
    isValid(
      {
        key: "lastName",
        value: lastName,
      },
      "string"
    );

    const byEmail = await UserModel.findOne({
      email,
    });
    const byUserName = await UserModel.findOne({
      userName,
    });
    if (byEmail) {
      throw "ایمیل وارد شده تکراری است";
    }
    if (byUserName) {
      throw "نام کاربری وارد شده تکراری است";
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      userName,
      password: hashedPassword,
      email,
      name,
      lastName,
    });

    await newUser.save();

    const userToken = jwt.sign(
      { userId: newUser._id },
      process.env.SALT as string,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { userId: newUser._id },
      process.env.SALT as string,
      {
        expiresIn: "7d",
      }
    );

    await UserModel.findOneAndUpdate(
      { email },
      {
        userToken,
        refreshToken,
      }
    );

    res.status(200).send({
      message: "کاربر با موفقیت ایجاد شد",
      userToken,
      refreshToken,
    });
  } catch (err) {
    res.status(422).send({
      message: "مشکلی هنگام ایجاد کاربر رخ داده",
      extraMessage: err,
    });
  }
});
