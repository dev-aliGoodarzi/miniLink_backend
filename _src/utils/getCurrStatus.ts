const si = require("systeminformation");

export const getCurrStatus = async () => {
  try {
    const cpu = await si.cpu();
    const ram = await si.mem();
    const disk = await si.diskLayout();
    const osInfo = await si.osInfo();

    return {
      cpu: JSON.stringify(cpu),
      ram: JSON.stringify(ram),
      disk: JSON.stringify(disk),
      osInfo: JSON.stringify(osInfo),
    };
  } catch (err) {
    return {
      cpu: JSON.stringify("null"),
      ram: JSON.stringify("null"),
      disk: JSON.stringify("null"),
      osInfo: JSON.stringify("null"),
    };
  }
};
