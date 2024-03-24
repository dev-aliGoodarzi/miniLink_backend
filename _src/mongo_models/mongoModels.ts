// Mongoose
import mongoose from "mongoose";
// Mongoose

// Schemas
import {
  serverLogSchema,
  serverRequestLogsSchema,
  shortLinkSchema,
  userSchema,
} from "../mongo_schema/shortLinkSchema";
// Schemas

export const ShortLinkModel = mongoose.model(
  "links_Collection",
  shortLinkSchema
);

export const LogStatusModel = mongoose.model(
  "server_LogCollection",
  serverLogSchema
);

export const ServerRequestLogsModel = mongoose.model(
  "server_Requests_Logs",
  serverRequestLogsSchema
);

export const UserModel = mongoose.model("users", userSchema);
