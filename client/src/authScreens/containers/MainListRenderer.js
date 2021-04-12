import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Title } from "react-native-paper";

const MainListRenderer = ({ lists }) => {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          label="New List"
          value={text}
          onChangeText={(val) => setText(val)}
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 20 }}>Your Lists ({lists.length})</Text>
        {lists.length ? (
          lists.map((item) => <Text>{item.listName}</Text>)
        ) : (
          <Text>No lists found</Text>
        )}
      </View>
    </View>
  );
};

export default MainListRenderer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 10,
  },
});
