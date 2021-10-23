import * as React from "react";
import { ImageBackground, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { getCurrentWifiInfoAsync, SetWifiAsync } from "../../api/wifi";
import { Theme } from "../../constants/theme";
import { AuthContext } from "../../context/auth.context";
import { getWifiInfoAsync, saveWifiInfoAsync } from "../../storage/wifi";

type wifiListType = {
  ssid: string;
  password: string;
};
export default function Wifi() {
  const [wifiList, setWifiList] = React.useState<Array<wifiListType>>([]);
  const [currentWifi, setCurrentWifi] = React.useState("");
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [ssid, setSsid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const authcontext = React.useContext(AuthContext);
  React.useEffect(() => {
    //get all the wifi lists
    loadWifiListAsync();
  }, []);
  const loadWifiListAsync = async () => {
    const list = await getWifiInfoAsync();
    if (list) {
      setWifiList(list);
    }
  };
  const handleWifiConnectAsync = async (_ssid: string, _password: string) => {
    if (_ssid.length == 0 || _password.length < 6) return;
    const res = await SetWifiAsync(_ssid, _password);
    if (res.success) {
      setCurrentWifi(_ssid);
      setWifiList([{ ssid: _ssid, password: _password }, ...wifiList]);
      saveWifiInfoAsync(_ssid, _password);
      alert("Connected");
      alert("Cannot connect");
      setTimeout(() => {
        getWifiNameAsync();
      }, 3000);
      setShowAddForm(false);
      return;
    }
  };
  const getWifiNameAsync = async () => {
    const res = await getCurrentWifiInfoAsync();
    setCurrentWifi(res.res);
  };
  React.useEffect(() => {
    setCurrentWifi(authcontext.curr_wifi_ssid);
  }, [authcontext.curr_wifi_ssid]);
  return (
    <ImageBackground
      source={Theme.bg.controls}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-start",
        backgroundColor: Theme.color.black,
      }}
    >
      <View>
        <Text
          style={{
            color: Theme.color.white,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Wifi Settings
        </Text>

        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                backgroundColor: Theme.color.white,
                padding: 10,
                margin: 10,
                borderRadius: 10,
                fontWeight: "700",
                color: Theme.color.diggerblue,
              }}
              onPress={() => {
                setShowAddForm(!showAddForm);
              }}
            >
              {!showAddForm && "Add +"}
              {showAddForm && "Cancel"}
            </Text>
          </View>
          {showAddForm && (
            <View style={{ backgroundColor: Theme.color.blue, margin: 10 }}>
              <TextInput
                placeholder="ssid"
                style={{ margin: 10, backgroundColor: Theme.color.bluesmoke }}
                onChangeText={(text) => setSsid(text)}
                autoCapitalize={"none"}
              />
              <TextInput
                placeholder="password"
                style={{ margin: 10, backgroundColor: Theme.color.bluesmoke }}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize={"none"}
              />
              <Button
                onPress={() => {
                  handleWifiConnectAsync(ssid, password);
                }}
                style={{ margin: 10 }}
                color={Theme.color.green}
              >
                {" "}
                Connect{" "}
              </Button>
            </View>
          )}

          {currentWifi != "" && (
            <Text
              style={{ color: Theme.color.white, margin: 10, fontSize: 18 }}
            >
              Connected to: {currentWifi}
            </Text>
          )}

          <Text
            style={{
              color: Theme.color.green,
              fontSize: 20,
              textAlign: "center",
              margin: 10,
            }}
          >
            Please Make Sure you are connected to your device's hotspot
          </Text>

          {/* <Text style={{ color: Theme.color.white, margin: 5 }}>
            Wifi history:{" "}
          </Text>
          {wifiList.map((w) => (
            <View
              key={w.ssid}
              style={{
                padding: 10,
                backgroundColor: Theme.color.diggerblue,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, color: Theme.color.white }}>
                {w.ssid}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {currentWifi != w.ssid ? (
                  <Text
                    style={{
                      padding: 5,
                      backgroundColor: Theme.color.green,
                      borderRadius: 10,
                    }}
                  >
                    Connect
                  </Text>
                ) : (
                  "Connected"
                )}
              </View>
            </View>
          ))} */}
        </View>
      </View>
    </ImageBackground>
  );
}
