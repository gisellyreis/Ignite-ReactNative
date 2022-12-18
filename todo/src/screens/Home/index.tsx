import { Image, TextInput, TouchableOpacity, View, Text, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { styles } from "./styles";
import { Task } from "../../components/Task";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  text: string;
  done: boolean;
}

export function Home() {

  const [isFocused, setIsFocused] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskText, setTaskText] = useState('')
  const [created, setCreated] = useState(0)
  const [done, setDone] = useState(0)

  useEffect(() => {
    const data = require('../../../public/data.json')
    setTasks(data.data)

    setCreated(data.data.length)
  }, [])

  function handleToDoAdd() {
    let count = tasks.length + 1;

    const newTask = {
      id: created + 1,
      text: taskText,
      done: false
    }
    setTasks(prevState => [...prevState, newTask])
    setTaskText('')

    setCreated(count)
  }

  function handleCheck(id: number) {
    tasks.map(task => {
      if(task.id == id && !task.done){
        let count = done + 1;
        task.done = true
        setDone(count)
      }
      else if(task.id == id && task.done) {
        let count = done - 1;
        task.done = false
        setDone(count)
      }
    })  
    
  }

  
  function handleTaskRemove(id: number) {
    let countCreate = tasks.length - 1;

    tasks.map(task => {
      if(task.id == id && task.done){
        let countDone = done - 1;
        setDone(countDone)
      }
    }) 

    setTasks(prevState => prevState.filter(task => task.id !== id))
    setCreated(countCreate)
  }


  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={require('../../assets/Logo.png')} 
      />

      <View style={styles.form}>
        <TextInput 
          style={[styles.input, isFocused && {borderWidth: 1, borderColor: '#5E60CE'}]} 
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor="#808080"
          onChangeText={setTaskText}
          value={taskText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <TouchableOpacity 
          style={styles.btnAdd}
          onPress={handleToDoAdd}
        >
          <Text style={styles.btnAddIcon}>
            <AntDesign name="pluscircleo" size={16} color="#FFF" />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={{'color': '#4EA8DE', 'fontWeight': 'bold'}}>
            Criadas
          </Text>
          <View style={styles.counter}>
            <Text style={styles.counterText}> {created} </Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={{'color': '#8284FA', 'fontWeight': 'bold'}}>
            Concluídas
          </Text>
          <View style={styles.counter}>
            <Text style={styles.counterText}> {done} </Text>
          </View>
        </View>
      </View>

      <FlatList 
        data={tasks}
        renderItem={({ item }) => (
          <Task 
              key={item.id}
              text={item.text} 
              onRemove={() => handleTaskRemove(item.id)} 
              onCheck={() => handleCheck(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Image 
              source={require('../../assets/Clipboard.png')} 
              style={styles.emptyImg}
            />
            <Text style={[styles.textEmptyTasks, { 'fontWeight': 'bold' }]}>
              Você ainda não tem tarefas cadastradas
            </Text>
            <Text style={styles.textEmptyTasks}>
              Crie tarefas e organize seus itens a fazer
            </Text>
          </View>
        )}
      />
    </View>
  )
}