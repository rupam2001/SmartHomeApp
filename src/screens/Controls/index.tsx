import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { commandOnOffApiCallAsync } from "../../api/components.api";
import { Theme } from "../../constants/theme";
import { switchType } from "../../types/types";

export default function Controls(): JSX.Element {
  const [switches, setSwitches] = useState<Array<switchType>>([...s]);

  const handleOnToggleLight = async (s: switchType) => {
    //api call here
    const res = await commandOnOffApiCallAsync(s);
    if (!res) {
      alert("Something went wrong");
      return;
    }
    if (!res.success) {
      alert(res.msg);
      return;
    }

    toggleLight(s._id);
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

  return (
    <View style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <View style={{ flex: 1 }}>
        <Text>Slider</Text>
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
              },
            ]}
          >
            <ToggleSwitch
              isOn={s.isOn}
              onColor={Theme.color.blue}
              offColor="gray"
              label=""
              labelStyle={{ color: "black", fontWeight: "bold" }}
              size="large"
              onToggle={(isOn: Boolean) => {
                handleOnToggleLight(s);
              }}
            />
            <Text style={{ fontWeight: "bold" }}>{s.title}</Text>
          </View>
        ))}
      </View>
    </View>
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
    _id: "123",
    isOn: false,
  },
  {
    title: "Light 2",
    _id: "124",
    isOn: false,
  },
  {
    title: "Light 3",
    _id: "125",
    isOn: false,
  },
];
