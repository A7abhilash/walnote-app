import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import { Button, Subheading, Title } from "react-native-paper";
import Loading from "../containers/Loading";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = () => {
  const { user, setIsAuthenticated } = useAuth();

  const handlePress = () => {
    AsyncStorage.removeItem("token").then(() => {
      setIsAuthenticated(false);
      // navigation.replace("Sign In");
    });
  };

  return user === null ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <Title>Name: {user.name}</Title>
      <Subheading>Email: {user.email}</Subheading>
      <Button mode="contained" onPress={handlePress}>
        Logout
      </Button>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
