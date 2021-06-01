import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { Button, Card, TextInput, Title } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { useMsg } from "../contexts/MsgContext";

const SignIn = ({ navigation }) => {
  const { setIsAuthenticated } = useAuth();
  const { setToast } = useMsg();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = () => {
    // console.log("Signed in");
    // console.log(email, password);
    if (email && password) {
      fetch("http://10.0.2.2:7781/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.error) {
            console.log(data.error);
            setToast(data.error);
          }
          if (data.msg) {
            // console.log(data);
            try {
              await AsyncStorage.setItem("token", data.token);
              setIsAuthenticated(true);
            } catch (error) {
              console.log(error);
            }

            Keyboard.dismiss();
            setEmail("");
            setPassword("");
            // navigation.replace("Home");
          }
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert("Invalid", "No blanks field allowed", [
        { text: "Understood" },
      ]);
    }
  };
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        {/* <Card.Title title="Welcome User" subtitle="Card Subtitle" /> */}
        <Title style={styles.title}>Welcome User</Title>
        <Card.Content>
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handlePress} style={styles.btn}>
            Sign In
          </Button>
        </Card.Actions>
      </Card>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace("Sign Up")}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  card: {
    paddingVertical: 20,
    elevation: 5,
    borderRadius: 30,
  },
  title: {
    color: "blue",
    fontSize: 25,
    textAlign: "center",
  },
  btn: {
    flex: 1,
  },
  input: {
    marginVertical: 5,
  },
});
