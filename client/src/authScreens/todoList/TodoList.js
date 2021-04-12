import React, { useEffect, useState } from "react";
import Loading from "../../containers/Loading";
import Error from "../../containers/Error";
import { useAuth } from "../../contexts/AuthContext";
import MainListRenderer from "../containers/MainListRenderer";
import { useMsg } from "./../../contexts/MsgContext";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./components/List";

const TodoList = () => {
  const { user } = useAuth();
  const { setToast } = useMsg();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lists, setLists] = useState(null);

  const addNewList = (val) => {
    setLoading(true);
    let list = {
      listName: val,
      todos: [],
      check: [],
      userId: user._id,
    };
    // console.log(list);
    fetch(`http://10.0.2.2:7781/lists`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setToast(data.error);
        }
        setLists([...lists, data]);
        setToast("Added New List Successfully!!!");
      })
      .catch((err) => {
        // console.log(error)
        setToast("Server Error");
      })
      .finally(() => setLoading(false));
  };

  const deleteList = (list) => {
    setLoading(true);
    fetch(`http://10.0.2.2:7781/lists/${list._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setToast(data.error);
          setError(true);
        } else {
          setLists(lists.filter((eachList) => eachList._id !== data.id));
          setToast("Deleted List Successfully!!!");
        }
      })
      .catch((error) => {
        // console.log(error);
        setToast("Server Error");
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://10.0.2.2:7781/lists/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setToast(data.error);
          setError(true);
        } else {
          setLists(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setToast("Server Error");
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const Stack = createStackNavigator();

  return (
    !loading &&
    !error && (
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="Todo list">
          {(props) => (
            <MainListRenderer
              {...props}
              items={lists}
              addNew={addNewList}
              handleDelete={deleteList}
              name="List"
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    )
  );
};
export default TodoList;
