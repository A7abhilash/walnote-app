import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../guestScreens/SignIn";
import SignUp from "../guestScreens/SignUp";

const GuestStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
};

export default GuestStack;
