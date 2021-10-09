import * as React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { LoginAsync } from "../../api/auth.api";
import { Theme } from "../../constants/theme";
import { AuthContext } from "../../context/auth.context";
import {
  saveAccessTokenAsync,
  saveDeviceIdAsync,
  saveRefreshTokenAsync,
  saveWsTokenAsync,
} from "../../storage/authdata";

export default function Login({}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const authcontext = React.useContext(AuthContext);
  const handleLoginlick = async () => {
    const res = await LoginAsync(email, password);
    if (!res?.success) {
      return;
    }
    // login successfull
    await saveAccessTokenAsync(res.access_token);
    await saveDeviceIdAsync(res.device_id);
    await saveWsTokenAsync(res.ws_token);
    authcontext?.setIsLoggedIn(true);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.color.whitesmoke,
        padding: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <View style={{ padding: 20, backgroundColor: Theme.color.white }}>
        <TextInput
          value={email}
          placeholder="email"
          onChangeText={(text) => setEmail(text)}
          style={{ padding: 10, marginVertical: 10, fontSize: 18 }}
          autoCapitalize={"none"}
        />
        <TextInput
          value={password}
          placeholder="password"
          onChangeText={(text) => setPassword(text)}
          style={{ padding: 10, marginVertical: 10, fontSize: 18 }}
          autoCapitalize={"none"}
        />
        <Button
          title="Login"
          onPress={handleLoginlick}
          color={Theme.color.blue}
        />
      </View>
    </View>
  );
}
