import { Schema } from "mongoose";
import { T_Log } from "../_Models/Types/T";

export const shortLinkSchema = new Schema({
  linkUrl: String,
  title: String,
  shortedLink: String,
  description: String,
});

export const serverLogSchema = new Schema({
  cpu: String,
  ram: String,
  disk: String,
  osInfo: String,
} as unknown as T_Log);

export const serverRequestLogsSchema = new Schema({
  logData: String,
});

export const userSchema = new Schema({
  name: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
  userToken: String,
  refreshToken: String,
});
