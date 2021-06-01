import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import icons from "../../../icons";

const Todos = ({ todo, index, isChecked, deleteTodo, editTodo, checkTodo }) => {
  return (
    <View style={styles.todoContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => checkTodo(index)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={isChecked ? icons.checked : icons.unchecked}
              style={{
                width: 20,
                height: 20,
                marginRight: 10,
                tintColor: isChecked ? "green" : "black",
              }}
            />
            <Text
              style={{
                fontSize: 20,
                textDecorationLine: isChecked ? "line-through" : "none",
                fontStyle: isChecked ? "italic" : "normal",
                width: "75%",
              }}
            >
              {todo}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity color="green" onPress={() => editTodo(todo, index)}>
            <Image
              source={icons.edit}
              style={{
                width: 20,
                height: 20,
                tintColor: "orange",
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity color="orange" onPress={() => deleteTodo(index)}>
            <Image
              source={icons.delete}
              style={{
                width: 20,
                height: 20,
                tintColor: "darkred",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todoContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
});
