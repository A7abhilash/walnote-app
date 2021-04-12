import React from "react";
import { StyleSheet, Text, View } from "react-native";

const List = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text>{item.listName}</Text>
      <Text>List</Text>
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
