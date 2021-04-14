import React, { useRef, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

const Notes = ({ route, saveNote }) => {
  const { list } = route.params;
  const [note, setNote] = useState(list?.note);
  const [noteName, setNoteName] = useState(list?.noteName);
  const richText = useRef();

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
      <View style={{ flex: 1 }}>
        <Title>Your Note</Title>
        <ScrollView>
          <RichEditor
            ref={richText}
            initialContentHTML={note}
            onChange={setNote}
            style={{ flex: 1 }}
            scrollEnabled={true}
          />
        </ScrollView>
        <RichToolbar
          style={{ backgroundColor: "#fff" }}
          selectedIconTint={{ color: "#333" }}
          selectedButtonStyle={{
            borderColor: "#333",
            borderStyle: "solid",
            borderBottomWidth: 1,
          }}
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.checkboxList,
            actions.undo,
            actions.redo,
          ]}
        />
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
