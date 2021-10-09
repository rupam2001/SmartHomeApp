import { ENDPOINT } from "../constants/global";

interface loginResponseType {
  access_token?: string;
  success: Boolean;
  device_id?: string;
  ws_token?: string;
}

export async function LoginAsync(
  email: string,
  password: string
): Promise<loginResponseType | undefined> {
  try {
    const res = await fetch(ENDPOINT + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json());
    return res;
  } catch (error) {
    return { success: false };
  }
}
