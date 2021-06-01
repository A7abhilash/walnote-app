import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../authScreens/Home";
import { Image } from "react-native";
import icons from "../icons";

const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Walnote",
        headerLeft: () => (
          <Image
            source={icons.walnote}
            style={{
              width: 30,
              height: 30,
              marginLeft: 15,
              tintColor: "white",
            }}
          />
        ),
        headerStyle: { backgroundColor: "darkblue" },
        headerTitleStyle: { color: "white", fontSize: 26, marginLeft: -20 },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AuthStack;
