import { Request, Response } from "express";

import multer from "multer";

export const addApplicationJsonToHeaderMiddleware = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const upload = multer();
  upload.none();
  next();
};
