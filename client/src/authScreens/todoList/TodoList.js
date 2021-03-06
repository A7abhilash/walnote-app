import React, { useEffect, useState } from "react";
import Loading from "../../containers/Loading";
import { useAuth } from "../../contexts/AuthContext";
import MainListRenderer from "../containers/MainListRenderer";
import { useMsg } from "./../../contexts/MsgContext";
import { createStackNavigator } from "@react-navigation/stack";
import List from "./components/List";

const TodoList = () => {
  const { user, authToken } = useAuth();
  const { setToast } = useMsg();
  const [loading, setLoading] = useState(true);
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
      headers: new Headers({
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setToast(data.error);
        } else {
          setLists([...lists, data]);
          setToast("Added New List Successfully!!!");
        }
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
      headers: new Headers({
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setToast(data.error);
        } else {
          setLists(lists.filter((eachList) => eachList._id !== data.id));
          setToast("Deleted List Successfully!!!");
        }
      })
      .catch((error) => {
        // console.log(error);
        setToast("Server Error");
      })
      .finally(() => setLoading(false));
  };

  const saveList = (list) => {
    // setLoading(true);
    list["userId"] = user._id;
    fetch(`http://10.0.2.2:7781/lists/${list.id}`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(list),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log( data);
        if (data.error) {
          setToast(data.error);
        } else if (data.updatedList.id === list._id) {
          setToast("List Saved!!!");
          setLists(data.allList);
        }
      })
      .catch((error) => {
        // console.log(error)
        setToast("Server Error");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://10.0.2.2:7781/lists/`, {
      headers: new Headers({
        Authorization: `Bearer ${authToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setToast(data.error);
        } else {
          setLists(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setToast("Server Error");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const Stack = createStackNavigator();

  return (
    !loading && (
      <Stack.Navigator headerMode="none">
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
        <Stack.Screen name="List">
          {(props) => <List {...props} saveList={saveList} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  );
};
export default TodoList;
