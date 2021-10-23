import React, { useEffect, useState } from "react";
import { getAccessTokenAsync, getDeviceIdAsync } from "../storage/authdata";

const AuthContext = React.createContext(null);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [access_token, setAccess_token] = useState(null);
  const [device_id, setDevice_id] = useState(null);
  const [curr_wifi_ssid, setCurr_wifi_ssid] = useState("");
  useEffect(() => {
    autoAuthAsync();
  }, []);
  const autoAuthAsync = async () => {
    const _access_token = await getAccessTokenAsync();
    const _device_id = await getDeviceIdAsync();
    if (!_access_token || !_device_id) {
      return;
    }
    setAccess_token(_access_token);
    setDevice_id(_device_id);
    setIsLoggedIn(true);
    console.log("auto auth");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        curr_wifi_ssid,
        setCurr_wifi_ssid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
