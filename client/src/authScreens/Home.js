import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import Loading from "../containers/Loading";
import { useAuth } from "../contexts/AuthContext";
import TodoList from "./todoList/TodoList";
import NoteTaking from "./noteTaking/Notetaking";
import UserProfile from "./UserProfile";

const Home = ({ navigation }) => {
  const { user } = useAuth();

  const Tab = createBottomTabNavigator();

  return user === null ? (
    <Loading />
  ) : (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: { paddingBottom: 15 },
        labelStyle: { fontSize: 15 },
      }}
    >
      <Tab.Screen name="Todo List" component={TodoList} />
      <Tab.Screen name="User Profile" component={UserProfile} />
      <Tab.Screen name="Note Taking" component={NoteTaking} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
