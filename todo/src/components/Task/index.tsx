import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather as Icon } from '@expo/vector-icons';

import { styles } from "./styles";
import { useState } from "react";

type Props = {
  text: string;
  onRemove: () => void;
}

export function Task({ text, onRemove }: Props) {
  const [isChecked, setIsChecked] = useState(false)
  const checkIcon = isChecked ? {name: "check-circle", color: "#5E60CE"} : {name: "circle", color: "#4EA8DE"}

  function handleCheck() {
    console.log('checked task!');
    setIsChecked(!isChecked)
  }

  return (
    <View style={styles.container}>
      
      <Pressable onPress={handleCheck}>
        <Icon style={styles.check} name={checkIcon.name} size={24} color={checkIcon.color}  />
      </Pressable>
      <Text style={[styles.text, isChecked && {'textDecorationLine': 'line-through', 'color': '#808080'}]}>
        { text }
      </Text>

      <TouchableOpacity 
          style={styles.btn}
          onPress={onRemove}
        >
          <Text style={styles.btnText}>
            <FontAwesome5 name="trash-alt" size={16} color="#808080" />
          </Text>
        </TouchableOpacity>
    </View>
  )
}