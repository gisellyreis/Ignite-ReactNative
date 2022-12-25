import { useCallback, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useFocusEffect, useRoute, useNavigation } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoverByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
}

export function Players() {
  const [team, setTeam] = useState('time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const navigation = useNavigation()

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
        console.log(error);
        
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      Alert.alert('Pessoas', 'Não foi possível carregar pessoas do time selecionado.')
      console.log(error);
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoverByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      Alert.alert('Remover Pessoa', 'Não foi possível remover a pessoa selecionada.')
      console.log(error);
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Remover grupo', 'Não foi possível remover o grupo.')
      console.log(error);
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel'},
        { text: 'Sim', onPress: () =>  groupRemove()}
      ]
    )
  }

  useFocusEffect(useCallback(() => {
    fetchPlayersByTeam()
  }, [team]))

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
          autoCorrect={false}
        />
        <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer}
        />
       </Form>

       <HeaderList>
        <FlatList 
          data={['time A', 'time B']}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            /> 
          )}
          horizontal
        />

        <NumberOfPlayers> {players.length} </NumberOfPlayers>
       </HeaderList>

       <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard 
            name={item.name} 
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time' />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100}, 
          players.length === 0 && {flex: 1}
        ]}
       />

       <Button 
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
       />
    </Container>
  )
}