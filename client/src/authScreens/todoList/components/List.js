import React from "react";
import { StyleSheet, Text, View } from "react-native";

const List = ({ item }) => {
  console.log(item);
  return (
    <View style={styles.container}>
      <Text>{item.listName}</Text>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
