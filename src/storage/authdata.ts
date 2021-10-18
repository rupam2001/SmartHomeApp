import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token_3";
const REFRESH_TOKEN_KEY = "refresh_token_3";
const DEVICE_ID_KEY = "device_id_3";
const WS_TOKEN = "ws_token_3";

export const saveAccessTokenAsync = async (token: string | undefined) => {
  if (!token) return;
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
};
export const saveRefreshTokenAsync = async (token: string | undefined) => {
  if (!token) return;
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
};
export const saveDeviceIdAsync = async (id: string | undefined) => {
  if (!id) return;
  await SecureStore.setItemAsync(DEVICE_ID_KEY, id);
};
export const getAccessTokenAsync = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};
export const getDeviceIdAsync = async () => {
  return await SecureStore.getItemAsync(DEVICE_ID_KEY);
};

export const saveWsTokenAsync = async (token: string | undefined) => {
  if (!token) return;
  await SecureStore.setItemAsync(WS_TOKEN, token);
};
export const getWsTokenAsync = async () => {
  return await SecureStore.getItemAsync(WS_TOKEN);
};
