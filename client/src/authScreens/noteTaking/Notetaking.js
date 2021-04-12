import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NoteTaking = () => {
  return (
    <View style={styles.container}>
      <Text>NoteTaking</Text>
    </View>
  );
};

export default NoteTaking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
