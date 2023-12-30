import { Schema } from "mongoose";

export const shortLinkSchema = new Schema({
  linkUrl: String,
  title: String,
  shortedLink: String,
});
