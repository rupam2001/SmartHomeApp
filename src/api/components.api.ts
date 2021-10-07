import { ENDPOINT } from "../constants/global";
import { switchType } from "../types/types";
const commandOnOffApiCallAsync = async (s: switchType) => {
  try {
    const res = await fetch(ENDPOINT + "/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        s,
        send_to_device: "true",
        device_id: "123456",
        command: "light_1",
      }),
    }).then((r) => r.json());
    return res;
  } catch (error) {
    return null;
  }
};

export { commandOnOffApiCallAsync };
