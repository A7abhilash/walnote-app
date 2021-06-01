import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Loading from "../containers/Loading";
import { useAuth } from "../contexts/AuthContext";
import TodoList from "./todoList/TodoList";
import NoteTaking from "./noteTaking/NoteTaking";
import UserProfile from "./UserProfile";
import { Image, StyleSheet, Text, View } from "react-native";
import icons from "../icons";

const Home = ({ navigation }) => {
  const { user } = useAuth();

  const Tab = createBottomTabNavigator();

  return user === null ? (
    <Loading />
  ) : (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 15,
          left: 15,
          right: 15,
          height: 60,
          paddingVertical: 5,
          elevation: 0,
          backgroundColor: "#eee",
          borderRadius: 15,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Todo List"
        component={TodoList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Image
                source={icons.list}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 14,
                }}
              >
                Todo List
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Image
                source={icons.user}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 14,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Note Taking"
        component={NoteTaking}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.labelContainer}>
              <Image
                source={icons.notes}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 14,
                }}
              >
                Notes
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
    // top: 5,
  },
});
