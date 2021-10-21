import * as SecureStore from "expo-secure-store";
const WIFI_INFO_KEY = "wifi_info_1";

export async function saveWifiInfoAsync(ssid: string, password: string) {
  let previousData = await SecureStore.getItemAsync(WIFI_INFO_KEY);
  if (!previousData) {
    const data = {
      data: [
        {
          ssid,
          password,
        },
      ],
    };
    await SecureStore.setItemAsync(WIFI_INFO_KEY, JSON.stringify(data));
    return Promise.resolve();
  }
  let { data } = JSON.parse(previousData);
  data.push({ ssid, password });
  await SecureStore.setItemAsync(WIFI_INFO_KEY, JSON.stringify({ data }));
  return Promise.resolve();
}

export async function getWifiInfoAsync() {
  const rawData = await SecureStore.getItemAsync(WIFI_INFO_KEY);
  return rawData ? JSON.parse(rawData).data : undefined;
}
