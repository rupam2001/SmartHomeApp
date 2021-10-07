import { StatusBar } from "react-native";
import React from "react";
import { Text, View } from "react-native";
import { Theme } from "./src/constants/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Controls from "./src/screens/Controls";
import Login from "./src/screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: Theme.color.white,
        height: "100%",
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Controls" component={Controls} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
