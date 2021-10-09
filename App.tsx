import { StatusBar } from "react-native";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Theme } from "./src/constants/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Controls from "./src/screens/Controls";
import Login from "./src/screens/Login";
import AuthContextProvider, { AuthContext } from "./src/context/auth.context";
import DataContextProvider from "./src/context/data.context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  );
}

const Main = () => {
  const authcontext = useContext(AuthContext);
  return (
    <View
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: Theme.color.white,
        height: "100%",
      }}
    >
      {authcontext?.isLoggedIn ? (
        <DataContextProvider isLoggedIn={authcontext?.isLoggedIn}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Controls" component={Controls} />
            </Stack.Navigator>
          </NavigationContainer>
        </DataContextProvider>
      ) : (
        <Login />
      )}
    </View>
  );
};
