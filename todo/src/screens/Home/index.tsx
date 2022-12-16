import { Image, TextInput, TouchableOpacity, View, Text, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { styles } from "./styles";
import { Task } from "../../components/Task";
import { useState } from "react";

export function Home() {

  const [isFocused, setIsFocused] = useState(false);
  const [tasks, setTasks] = useState<string[]>([])
  const [taskText, setTaskText] = useState('')
  const [created, setCreated] = useState(0)

  function handleToDoAdd() {
    let count = tasks.length + 1;
    setTasks(prevState => [...prevState, taskText])
    setTaskText('')

    setCreated(count)
  }

  function handleTaskRemove(text: string) {
    let count = tasks.length - 1;
    setTasks(prevState => prevState.filter(task => task !== text))
    setCreated(count)
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
            <Text style={styles.counterText}>0</Text>
          </View>
        </View>
      </View>

      <FlatList 
        data={tasks}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Task 
              key={item}
              text={item} 
              onRemove={() => handleTaskRemove(item)} 
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