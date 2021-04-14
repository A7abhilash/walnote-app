import React, { useEffect, useState } from "react";
import Loading from "../../containers/Loading";
import { useAuth } from "../../contexts/AuthContext";
import MainListRenderer from "../containers/MainListRenderer";
import { useMsg } from "./../../contexts/MsgContext";
import { createStackNavigator } from "@react-navigation/stack";
import Notes from "./components/Notes";

const NoteTaking = () => {
  const { user } = useAuth();
  const { setToast } = useMsg();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(null);

  const addNewNote = (val) => {
    setLoading(true);
    let note = {
      noteName: val,
      note: "<p>Start writing your notes...</p>",
      userId: user._id,
    };
    // console.log(list);
    fetch(`http://10.0.2.2:7781/notes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setToast(data.error);
        } else {
          setNotes([data, ...notes]);
        }
      })
      .catch((error) => {
        // console.log(error)
        setToast("Server Error");
      })
      .finally(() => setLoading(false));
  };

  const deleteNote = (note) => {
    setLoading(true);
    fetch(`http://10.0.2.2:7781/notes/${note._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setToast(data.error);
        } else {
          setNotes(notes.filter((eachNote) => eachNote._id !== data.id));
        }
      })
      .catch((error) => {
        // console.log(error)
        setToast("Server Error");
      })
      .finally(() => setLoading(false));
  };

  const saveNote = (note) => {
    note["userId"] = user._id;
    fetch(`http://10.0.2.2:7781/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setToast(data.error);
        } else if (data.updatedNote.id === note._id) {
          setToast("Note Saved!!!");
          setNotes(data.allNotes);
        }
      })
      .catch((error) => {
        // console.log(error);
        setToast("Server Error");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://10.0.2.2:7781/notes/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setToast(data.error);
        } else {
          setNotes(data);
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
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="Note Taking">
          {(props) => (
            <MainListRenderer
              {...props}
              items={notes}
              addNew={addNewNote}
              handleDelete={deleteNote}
              name="Note"
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Note">
          {(props) => <Notes {...props} saveNote={saveNote} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  );
};
export default NoteTaking;
