import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TodoList = () => {
  return (
    <View style={styles.container}>
      <Text>TodoList</Text>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});