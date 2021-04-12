import React, { useState } from "react";
import { Keyboard, StyleSheet, Text, View, FlatList } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Todos from "./Todos";

const List = ({ route, saveList }) => {
  const { list } = route.params;
  const [newTodo, setNewTodo] = useState("");
  const [listName, setListName] = useState(list?.listName);
  const [todos, setTodos] = useState(list?.todos);
  const [check, setCheck] = useState(list?.check);
  //   const [todos, setTodos] = useState([
  //     "djks",
  //     "dkjasdhkjais",
  //     "fdhjf",
  //     "dkjshf",
  //     "dkjsfkjd",
  //     "dkjsbkj",
  //   ]);
  //   const [check, setCheck] = useState([false, true, true, false, true, false]);

  const addNewTodo = () => {
    if (newTodo) {
      // console.log(newTodo);
      setTodos([newTodo, ...todos]);
      setCheck([false, ...check]);
      setNewTodo("");
      Keyboard.dismiss();
    }
  };

  const editTodo = (todo, index) => {
    setTodos(todos.filter((editingTodo) => editingTodo !== todo));
    setCheck(check.filter((eachCheck, i) => i !== index));
    setNewTodo(todo);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
    setCheck(check.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    let updateList = {
      listName,
      todos,
      check,
      id: list._id,
    };
    // console.log(updateList);
    saveList(updateList);
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
          label="List name"
          value={listName}
          onChangeText={(val) => setListName(val)}
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
          Save list
        </Button>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>Your todos ({todos.length})</Text>
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "stretch",
          }}
        >
          <TextInput
            mode="outlined"
            label="New Todo"
            value={newTodo}
            onChangeText={(val) => setNewTodo(val)}
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
            color="#333"
            onPress={addNewTodo}
          >
            Add
          </Button>
        </View>
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
                editTodo={editTodo}
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
