import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import SignIn from "./guestScreens/SignIn";
import SignUp from "./guestScreens/SignUp";
import Loading from "./containers/Loading";
import Home from "./authScreens/Home";
import { useAuth } from "./contexts/AuthContext";

const AppNavigator = () => {
  const { loading, isAuthenticated } = useAuth();
  const Stack = createStackNavigator();
  //   console.log(isAuthenticated);
  return (
    <NavigationContainer>
      <StatusBar style="auto" backgroundColor="blue" barStyle="light-content" />
      <View style={styles.container}>
        <Stack.Navigator headerMode={false}>
          {loading ? (
            <Stack.Screen name="Loading" component={Loading} />
          ) : isAuthenticated === false ? (
            <>
              <Stack.Screen name="Sign In" component={SignIn} />
              <Stack.Screen name="Sign Up" component={SignUp} />
              <Stack.Screen name="Home" component={Home} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Sign In" component={SignIn} />
              <Stack.Screen name="Sign Up" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
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
