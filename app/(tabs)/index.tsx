import { supabase } from "@/services/supabase";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import { FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function Index() {

  const [tasks, setTasks] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState<string>("");
  const [error, setError] = useState<any>();
  useEffect(() => {

    setLoad(true);
    const fetchdata = async () => {
      try {

        let { data: todolist, error: supabaseerror } = (await supabase.from('todolist').select('*').order("id", { ascending: false }));
        if (todolist && todolist.length > 0) {
          setTasks(todolist);

        }
        if (supabaseerror) {
          throw supabaseerror

        }
      } catch (error) {
        setError(error);

      }
    }
    setLoad(false);
    fetchdata()
  }, [])


  const reloadData = async () => {
    try {

      let { data: todolist, error: supabaseerror } = (await supabase.from('todolist').select('*').order("id", { ascending: false }));
      if (todolist && todolist.length > 0) {
        setTasks(todolist);

      }
      if (supabaseerror) {
        throw supabaseerror

      }
    } catch (error) {
      setError(error);

    }

  }

  const addItem = async (task: string) => {
    try {
      if (taskInput.length > 0 && taskInput !== " ") {
        const { data, error: additemerror } = await supabase.from('todolist').insert([{ task }]).select();
        if (data) {
          setError("");
        }
        if (additemerror) {
          throw additemerror
        }
      } else {
        throw "Enter Item ...."
      }
      let { data: todolist, error: supabaseerror } = await supabase.from('todolist').select('*').order("id", { ascending: false });
      if (todolist && todolist.length > 0) {
        setTasks(todolist);
        setTaskInput("");
      }
      if (supabaseerror) {
        throw supabaseerror

      }


    } catch (error) {
      setError(error);

    }
  }

  const deleteItem = async (taskid: number) => {
    try {
      const { error: deleteItemError } = await supabase.from('todolist').delete().eq('id', taskid);
      if (deleteItemError) {
        throw deleteItemError
      }
      let { data: todolist, error: supabaseerror } = await supabase.from('todolist').select('*').order("id", { ascending: false });
      if (todolist && todolist.length > 0) {
        setTasks(todolist);
        setTaskInput("");
      } else {
        setTasks([]);
      }
      setError("");
      if (supabaseerror) {
        throw supabaseerror

      }



    } catch (error) {
      setError(error);

    }
  }

  if (load) {
    return <Text>Loading</Text>

  }

  type ItemProp = { itemname: string, itemid: number };
  const Item = ({ itemname, itemid }: ItemProp) => {


    return (
      <View style={{ padding: 5, display: "flex", width: "auto", flexDirection: "row", justifyContent: "space-around", margin: 6, backgroundColor: "lightblue",borderRadius:5 }}>
        <Text style={{ fontSize: 24, flex: 1, flexGrow: 5, overflowX: "scroll" }}> <Ionicons name="arrow-forward-circle" /> {itemname}</Text>
        <Link href={`/updateitem/${itemid}`} asChild>
          <TouchableOpacity style={{ flex: 1, backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
            <Text style={{ color: "white", textAlign: "center", }}> <Ionicons name="pencil-sharp" /> </Text>
          </TouchableOpacity>

        </Link>

        <TouchableOpacity onPress={() => deleteItem(itemid)} style={{ backgroundColor: "red", padding: 10, borderRadius: 5, flex: 1 }}>
          <Text style={{ color: "white", textAlign: "center", }}> <Ionicons name="trash-bin-sharp" /> </Text>
        </TouchableOpacity>


      </View>
    )
  }
  return (
    <View>
      <Text style={styles.heading} >Todo App</Text>
      <TextInput style={styles.input} placeholder="task here..." value={taskInput} onChangeText={(value) => setTaskInput(value)} />
      <TouchableOpacity style={styles.button} onPress={() => addItem(taskInput)}  >
        <Text style={{ color: "white", textAlign: "center", }}> <Ionicons name="add-sharp" /> Add Item</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {tasks.length > 0 &&
        < Animated.FlatList refreshControl={ <RefreshControl refreshing={load} onRefresh={reloadData} />} scrollEnabled={true} keyboardDismissMode={"on-drag"} itemLayoutAnimation={LinearTransition} style={styles.listStyle} data={tasks} keyExtractor={item => item.id} renderItem={({ item }) => <Item itemname={item.task} itemid={item.id} />} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "auto",
    margin: 5,
    borderRadius: 5,
    borderColor: "blue"
  },
  listStyle: {
    marginBottom: 190

  },
  button: {
    width: "auto",
    padding: 20,
    backgroundColor: "blue",
    borderRadius: 5,
    margin: 5,
  },
  errorText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold"
  }
})
