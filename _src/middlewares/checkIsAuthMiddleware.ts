// Express
import { Request, Response } from "express";
// Express

// JWT
import jwt from "jsonwebtoken";
// JWT

// Models
import { UserModel } from "../mongo_models/mongoModels";
// Models

export const checkIsAuthMiddleware = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "توکن وارد نشده" });
  try {
    const isActiveToken = await UserModel.findOne({ userToken: token });
    if (!isActiveToken) {
      throw "توکن غیر قابل شناسایی است و معتبر نمیباشد .";
    }
    const decoded: any = jwt.verify(token, process.env.SALT as string);
    req.userId = String(decoded.userId as any);
    next();
  } catch (err) {
    res.status(401).json({ error: err || "توکن نامعتبر" });
  }
};
