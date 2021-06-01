import React, { useState } from "react";
import { Alert, Keyboard, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Button, List, TextInput } from "react-native-paper";
import { useMsg } from "../../contexts/MsgContext";

const MainListRenderer = ({
  navigation,
  items,
  addNew,
  name,
  handleDelete,
}) => {
  const { setAlert } = useMsg();
  const [text, setText] = useState("");

  const pressHandler = () => {
    if (text) {
      // console.log(text);
      addNew(text);
      Keyboard.dismiss();
    } else {
      setAlert({
        title: "Error",
        msg: "No blank fields allowed",
        text: "Understood",
      });
    }
  };

  const handleLongPress = (item) => {
    Alert.alert("Confirm", "Are you sure to delete this?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: () => handleDelete(item),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          label={`New ${name}`}
          value={text}
          onChangeText={(val) => setText(val)}
          style={{ height: 60 }}
        />
        <Button
          mode="contained"
          style={{ marginTop: 5 }}
          onPress={pressHandler}
        >
          Add New {name}
        </Button>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>
          Your {name}s ({items.length})
        </Text>
        {items.length ? (
          <FlatList
            data={items}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.list}
                onPress={() => navigation.navigate(name, { list: item })}
                onLongPress={() => handleLongPress(item)}
              >
                <List.Item
                  title={item.listName || item.noteName}
                  titleStyle={{ fontSize: 18 }}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>No {name}s Found</Text>
        )}
      </View>
    </View>
  );
};

export default MainListRenderer;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, marginHorizontal: 10 },
  list: {
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 10,
    elevation: 1,
    marginHorizontal: 5,
  },
});
