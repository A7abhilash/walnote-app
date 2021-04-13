import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Notes = ({ route, saveNote }) => {
  const { list } = route.params;
  const [note, setNote] = useState(list?.note);
  const [noteName, setNoteName] = useState(list?.noteName);

  const handleSave = () => {
    let updatedNote = {
      noteName,
      note,
      id: list._id,
    };
    saveNote(updatedNote);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        <TextInput
          mode="outlined"
          label="Note name"
          value={noteName}
          onChangeText={(val) => setNoteName(val)}
          style={{ height: 50, flex: 9 }}
        />
        <Button
          mode="contained"
          style={{
            marginTop: 5,
            flex: 1,
            marginLeft: 5,
            justifyContent: "center",
          }}
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
  },
});
