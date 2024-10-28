import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function generateId() {
  return Math.random();
}

export default function App() {
  const [task, setTask] = useState(''); 
  const [tasks, setTasks] = useState([]); 

  function addTask(){
    if (task.trim()) { //corrobora que no se añada un string vacío
      const newTask = { id: generateId(), text: task };
      setTasks([...tasks, newTask]); 
      setTask(''); 
    }
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  const renderTaskItem = ({ item }) => {
    return (
      <Swipeable 
        overshootRight={false}
        renderRightActions={() => (
          <Pressable style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
            <Icon name="trash" size={15} color="white" />
          </Pressable>
        )}
      >
        <View style={styles.taskItem}>
          <Text style={styles.taskText}>{item.text}</Text>
        </View>
      </Swipeable>
    );
  };
  

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lista de tareas</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Agrega una nueva tarea aquí'
            style = {styles.input}
            value = {task}
            onChangeText= {setTask}
          />
          <Pressable style={styles.inputButton} onPress={addTask}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
        <View style={styles.list}>
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5D9',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  }, 
  list: {
    flex: 1,
    width: "100%",
    alignContent: 'center',
  }, 
  title: {
    fontSize: 40, 
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  }, 
  inputContainer: {
    flexDirection: "row",
    width: "90%", 
    gap: 10, 
    marginBottom: 20
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
    fontFamily: 'Times New Roman',
    textAlign: 'center'
  }, 
  inputButton: {
    backgroundColor: "#FEC89A",
    padding: 10,
    fontSize: 20,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Times New Roman',
    fontWeight: "bold"
  }, 
  taskItem: {
    backgroundColor: '#FFD7BA',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    minWidth: "90%", 
    height: 40,
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 20,
    fontFamily: "Times New Roman",
    textAlign: "left"
  }, 
  deleteButton: {
    backgroundColor: "#F44336", 
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'left',
    minWidth: "90%",
    height: 40,
    borderRadius: 15,
  }
});
