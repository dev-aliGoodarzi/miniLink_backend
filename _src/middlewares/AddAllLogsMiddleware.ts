import { Request, Response } from "express";

import { ServerRequestLogsModel } from "../mongo_models/mongoModels";

export const AddAllLogsMiddleware = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const data = {
    ip: req.ip,
    reqType: req.method,
    time: Date.now(),
  };

  const NewLog = new ServerRequestLogsModel({
    logData: JSON.stringify(data),
  });

  await NewLog.save();
  next();
};
