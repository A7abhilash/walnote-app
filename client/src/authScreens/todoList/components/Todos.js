import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const Todos = ({ todo, index, isChecked, deleteTodo, editTodo, checkTodo }) => {
  return (
    <View style={styles.todoContainer}>
      <View style={{ flex: 7 }}>
        <Text
          style={{
            fontSize: 20,
            textDecorationLine: isChecked ? "line-through" : "none",
            fontStyle: isChecked ? "italic" : "normal",
          }}
        >
          {todo}
        </Text>
      </View>
      <View style={styles.actions}>
        <View style={{ flex: 4, alignItems: "flex-start" }}>
          <Button onPress={() => checkTodo(index)}>
            Mark as {!isChecked ? "Done" : "Undo"}
          </Button>
        </View>
        <View
          style={{ flex: 4, flexDirection: "row", alignItems: "flex-start" }}
        >
          <Button color="green" onPress={() => editTodo(todo, index)}>
            Edit
          </Button>
          <Button color="orange" onPress={() => deleteTodo(index)}>
            Delete
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: "#eee",
    marginVertical: 10,
    padding: 10,
  },
  actions: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
