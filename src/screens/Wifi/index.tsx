import * as React from "react";
import { ImageBackground, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SetWifiAsync } from "../../api/wifi";
import { Theme } from "../../constants/theme";
import { getWifiInfoAsync } from "../../storage/wifi";

export default function Wifi() {
  const [wifiList, setWifiList] = React.useState([
    "network1",
    "network2",
    "network3",
  ]);
  const [currentWifi, setCurrentWifi] = React.useState(null);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [ssid, setSsid] = React.useState("");
  const [password, setPassword] = React.useState("");
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
  const handleWifiConnectAsync = async () => {
    if (ssid.length == 0 || password.length < 8) return;
    const res = await SetWifiAsync(ssid, password);
    console.log(res);
  };
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
              />
              <TextInput
                placeholder="password"
                style={{ margin: 10, backgroundColor: Theme.color.bluesmoke }}
                onChangeText={(text) => setPassword(text)}
              />
              <Button
                onPress={() => {
                  handleWifiConnectAsync();
                }}
                style={{ margin: 10 }}
                color={Theme.color.green}
              >
                {" "}
                Connect{" "}
              </Button>
            </View>
          )}

          <Text style={{ color: Theme.color.white, margin: 5 }}>
            Wifi history:{" "}
          </Text>
          {wifiList.map((w) => (
            <View
              key={w}
              style={{
                padding: 10,
                backgroundColor: Theme.color.diggerblue,
                margin: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, color: Theme.color.white }}>
                {w}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    backgroundColor: Theme.color.green,
                    borderRadius: 10,
                  }}
                >
                  Connect
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}
