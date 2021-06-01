import React, { useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput, Title } from "react-native-paper";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import icons from "../../../icons";

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
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          label="Note name"
          value={noteName}
          onChangeText={(val) => setNoteName(val)}
          style={{ height: 50, flex: 9 }}
        />
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={handleSave}>
          <Image
            source={icons.save}
            style={{ width: 30, height: 30, tintColor: "green", opacity: 0.5 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.86 }}>
        <Title>Your Note</Title>
        <ScrollView>
          <RichEditor
            ref={richText}
            initialContentHTML={note}
            onChange={setNote}
            style={{ flex: 1, marginBottom: 5 }}
            scrollEnabled={true}
          />
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
        </ScrollView>
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
