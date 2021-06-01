import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import icons from "../../../icons";
import Todos from "./Todos";

const List = ({ route, saveList }) => {
  const { list } = route.params;
  const [newTodo, setNewTodo] = useState("");
  const [listName, setListName] = useState(list?.listName);
  const [todos, setTodos] = useState(list?.todos);
  const [check, setCheck] = useState(list?.check);

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
    setCheck(check.filter((_, i) => i !== index));
    setNewTodo(todo);
  };

  const checkTodo = (index) => {
    let updatedChecks = check.map((eachCheck, i) => {
      if (i === index) {
        return !eachCheck;
      }
      return eachCheck;
    });
    setCheck(updatedChecks);
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
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          label="List name"
          value={listName}
          onChangeText={(val) => setListName(val)}
          style={{ height: 50, flex: 9 }}
        />
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={handleSave}>
          <Image
            source={icons.save}
            style={{ width: 30, height: 30, tintColor: "green", opacity: 0.5 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 20 }}>Your todos ({todos.length})</Text>
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            mode="outlined"
            label="New Todo"
            value={newTodo}
            onChangeText={(val) => setNewTodo(val)}
            style={{ height: 50, flex: 9 }}
          />
          <TouchableOpacity style={{ marginLeft: 15 }} onPress={addNewTodo}>
            <Image
              source={icons.add}
              style={{
                width: 45,
                height: 45,
                tintColor: "darkblue",
                opacity: 0.5,
              }}
            />
          </TouchableOpacity>
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
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                checkTodo={checkTodo}
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
    padding: 10,
    marginHorizontal: 10,
  },
});
