import { ESPENDPOINT } from "../constants/global";

export async function SetWifiAsync(ssid: string, password: string) {
  try {
    const res = await fetch(
      ESPENDPOINT + `/setwifisettings?ssid=${ssid}&pwd=${password} `,
      { method: "GET" }
    );
    return { ...res, success: true };
  } catch (error) {
    return { success: false };
  }
}
export async function getCurrentWifiInfoAsync() {
  try {
    const res = await fetch(ESPENDPOINT + `/getwifisettings`, {
      method: "GET",
    }).then((r) => r.text());
    return { res: res, success: true };
  } catch (error) {
    return { res: "", success: false };
  }
}
