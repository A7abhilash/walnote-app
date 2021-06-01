import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import SignIn from "./guestScreens/SignIn";
import SignUp from "./guestScreens/SignUp";
import Home from "./authScreens/Home";
import Loading from "./containers/Loading";
import { useAuth } from "./contexts/AuthContext";
import GuestStack from "./stack/GuestStack";
import AuthStack from "./stack/AuthStack";

const AppNavigator = () => {
  const { loading, isAuthenticated } = useAuth();
  const Stack = createStackNavigator();
  //   console.log(isAuthenticated);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" backgroundColor="blue" barStyle="light-content" />
      <View style={styles.container}>
        {isAuthenticated === false ? <GuestStack /> : <AuthStack />}
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 30,
  },
});
