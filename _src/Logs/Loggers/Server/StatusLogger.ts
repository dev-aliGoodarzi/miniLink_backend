// Models
import { T_Log } from "../../../_Models/Types/T";
import { LogStatusModel } from "../../../mongo_models/mongoModels";
// Models

// Utils
import { getCurrStatus } from "../../../utils/getCurrStatus";
// Utils

export const StatusLogger = async () => {
  const log = (await getCurrStatus()) as T_Log;

  const NewLink = new LogStatusModel(log);

  await NewLink.save();
};
