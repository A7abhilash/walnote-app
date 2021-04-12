import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, View, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Todos from "./Todos";

const List = ({ route, saveList }) => {
  const { list } = route.params;
  const [listName, setListName] = useState(list?.listName);
  //   const [todos, setTodos] = useState(list?.todos);
  const [todos, setTodos] = useState([
    "djks",
    "dkjasdhkjais",
    "fdhjf",
    "dkjshf",
    "dkjsfkjd",
    "dkjsbkj",
  ]);
  //   const [check, setCheck] = useState(list?.check);
  const [check, setCheck] = useState([false, true, true, false, true, false]);

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    setCheck(check.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    let updateList = {
      listName,
      todos,
      check,
      id: item._id,
    };
    console.log(updateList);
    // saveList(updateList);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          label="List name"
          value={listName}
          onChangeText={(val) => setListName(val)}
          style={{ height: 60 }}
        />
        <Button mode="contained" style={{ marginTop: 5 }} onPress={handleSave}>
          Save list
        </Button>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>Your todos ({todos.length})</Text>
        {todos.length ? (
          <FlatList
            data={todos}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
              <Todos
                todo={item}
                index={index}
                isChecked={check[index]}
                deleteTodo={deleteTodo}
              />
            )}
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 30 }}>
            No todos added
          </Text>
        )}
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
  },
});
