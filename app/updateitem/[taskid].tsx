import { router, useLocalSearchParams } from 'expo-router'
import { View, Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native'
import { supabase } from '@/services/supabase';
import { useEffect, useState } from 'react';
import db from '@/services/todostore';
export default function UpdateItem() {
  const [taskInput,setTaskInput] = useState<any>("");
  const [load,setLoad] = useState<boolean>(false);
  const [error,setError] = useState<any>();
  const {taskid} = useLocalSearchParams();
  
  const TABLE = "main";
  useEffect(()=>{
    
    const fetchdata = async ()=>{
      try {
        setLoad(true);
        let data = await db.getFirstAsync(`SELECT * FROM ${TABLE} WHERE id=${taskid}`);
        setTaskInput(data.task);
        
        setLoad(false);
      } catch (error) {
          setError(error);
                          
      }
    }
    fetchdata();
  },[])

  const updateTask = async (taskid:any)=>{
    try {
      const updateStmt = await db.prepareAsync(`UPDATE ${TABLE} SET task = "${taskInput}" WHERE id = $taskid`);

      try {
                await updateStmt.executeAsync({$taskid:taskid}); 
      

      } catch (error) {
          setError(error);
                          
      }finally{
        await updateStmt.finalizeAsync();
      }
      router.navigate("/");
  } catch (error) {
      setError(error);
    }  }
  
  if(load){
    return <Text>Loading ...</Text>
  }

  return (
    <View style={styles.container}>
       <Text style={styles.heading} >Update Item</Text>
      <TextInput style={styles.input} value={taskInput} onChangeText={(value)=>setTaskInput(value)} placeholder="task here..." />
      <TouchableOpacity style={styles.button} onPress={()=>updateTask(taskid)}>
        <Text style={{ color: "white", textAlign: "center", }}>Update Item</Text>
      </TouchableOpacity>
      {error && <Text>{error}</Text>}
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top:-100   
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
    width: 300,
    margin: 5,
    borderRadius: 5,
    borderColor: "blue"
  },
  listStyle: {
    flex: 0,
    margin: 5
  },
  button: {
    width: 300,
    padding: 20,
    backgroundColor: "blue",
    borderRadius: 5,
    margin: 5,
  }
})
