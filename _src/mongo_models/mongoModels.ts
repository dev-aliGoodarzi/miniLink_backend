// Mongoose
import mongoose from "mongoose";
// Mongoose

// Schemas
import { shortLinkSchema } from "../mongo_schema/shortLinkSchema";
// Schemas

export const ShortLinkModel = mongoose.model(
  "linksCollection",
  shortLinkSchema
);
