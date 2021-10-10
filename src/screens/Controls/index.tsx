import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { commandOnOffApiCallAsync } from "../../api/components.api";
import Slider from "../../components/Slider";
import { Theme } from "../../constants/theme";
import { AuthContext } from "../../context/auth.context";
import { DataContext } from "../../context/data.context";
import { getDeviceIdAsync, getWsTokenAsync } from "../../storage/authdata";
import { switchType } from "../../types/types";

export default function Controls(): JSX.Element {
  const [switches, setSwitches] = useState<Array<switchType>>([...s]);
  const datacontext = useContext(DataContext);
  const authcontext = useContext(AuthContext);
  const [currentSliderValue, setCurrentSliderValue] = useState("0");

  const [states, setStates] = useState(null);

  const handleOnToggleLight = async (s: switchType) => {
    // //api call here
    // const res = await commandOnOffApiCallAsync(s);
    // if (!res) {
    //   alert("Something went wrong");
    //   return;
    // }
    // if (!res.success) {
    //   alert(res.msg);
    //   return;
    // }

    // toggleLight(s._id);

    const msg = {
      ...s,
      send_to_device: true,
      device_id: await getDeviceIdAsync(),
      ws_token: await getWsTokenAsync(),
      command: s._id,
    };
    // toggleLight(s._id);
    datacontext.sendMessage(JSON.stringify(msg));
  };
  const toggleLight = (_id: String) => {
    let temp = [...switches];
    for (let i = 0; i < switches.length; i++) {
      if (temp[i]._id == _id) {
        temp[i].isOn = !temp[i].isOn;
        setSwitches(temp);
        return;
      }
    }
  };

  useEffect(() => {
    const { messageQueue } = datacontext;
    if (messageQueue.length == 0) return;
    const msg = messageQueue[0];
    if (msg.type == "state_info") {
      //handle the new states
      setStates(msg.states);
    }

    let temp = [...messageQueue];
    temp.shift(); // removing the first element
    datacontext.setMessageQueue(temp);
  }, [datacontext.messageQueue]);

  useEffect(() => {
    if (!states) return;
    let temp = [...switches];
    for (const key in states) {
      if (key == "dimmer") {
        setCurrentSliderValue(states[key]);
        continue;
      }
      for (let i = 0; i < switches.length; i++) {
        if (temp[i]._id == key) {
          temp[i].isOn = !states[key];
        }
      }
    }
    setSwitches(temp);
    setStates(null);
  }, [states]);

  useEffect(() => {
    //request for initial states
    getStates();
  }, []);
  const getStates = async () => {
    datacontext.sendMessage(
      JSON.stringify({
        getStates: true,
        device_id: await getDeviceIdAsync(),
        ws_token: await getWsTokenAsync(),
      })
    );
  };

  const handleDimmerSpeedChange = async (newSpeed: string) => {
    datacontext.sendMessage(
      JSON.stringify({
        send_to_device: true,
        device_id: await getDeviceIdAsync(),
        ws_token: await getWsTokenAsync(),
        command: "dimmer",
        value: newSpeed,
      })
    );
    setCurrentSliderValue(newSpeed);
  };

  return (
    <ImageBackground
      source={Theme.bg.controls}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        backgroundColor: Theme.color.black,
      }}
    >
      <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: Theme.color.blue,
            paddingVertical: 20,
            marginHorizontal: 8,
            borderRadius: 10,
          }}
        >
          <Slider
            values={["0", "1", "2", "3"]}
            onChange={(val) => {
              handleDimmerSpeedChange(val);
            }}
            currentValue={currentSliderValue}
          />
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 20,
              color: Theme.color.whitesmoke,
            }}
          >
            FAN SPEED
          </Text>
        </View>
      </View>
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingVertical: 10,
            flex: 1,
          },
        ]}
      >
        {switches.map((s) => (
          <View
            key={s._id}
            style={[
              {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: [{ scale: 1.5 }],
              },
            ]}
          >
            <View
              style={{ transform: [{ rotate: "90deg" }], marginBottom: 20 }}
            >
              <ToggleSwitch
                isOn={s.isOn}
                onColor={Theme.color.green}
                offColor="gray"
                label=""
                labelStyle={{ color: "black", fontWeight: "bold" }}
                size="large"
                onToggle={(isOn: Boolean) => {
                  handleOnToggleLight(s);
                }}
              />
            </View>
            <Text style={{ fontWeight: "bold", color: Theme.color.white }}>
              {s.title}
            </Text>
          </View>
        ))}
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  switch: {
    transform: [{ rotate: "90deg" }],
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

const s = [
  {
    title: "Light 1",
    _id: "l1",
    isOn: false,
  },
  {
    title: "Light 2",
    _id: "l2",
    isOn: false,
  },
  {
    title: "Light 3",
    _id: "l3",
    isOn: false,
  },
];
