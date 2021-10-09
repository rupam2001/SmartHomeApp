import * as React from "react";
import { View, Text } from "react-native";
import { Theme } from "../../constants/theme";

interface propType {
  values: Array<string>;
  onChange: Function;
  currentValue: string;
}

export default function Slider(props: propType) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {props.values.map((v) => (
        <Text
          key={v}
          style={{
            padding: 4,
            fontSize: 40,
            marginHorizontal: 4,
            backgroundColor:
              props.currentValue == v
                ? Theme.color.green
                : Theme.color.bluesmoke,
            color: props.currentValue == v ? Theme.color.white : "black",
            borderRadius: 40,
            paddingHorizontal: 20,
            transform: [{ scale: props.currentValue == v ? 1 : 0.7 }],
          }}
          onPress={() => props.onChange(v)}
        >
          {v}
        </Text>
      ))}
    </View>
  );
}
