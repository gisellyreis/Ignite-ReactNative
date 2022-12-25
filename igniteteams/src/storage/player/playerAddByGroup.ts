import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { playersGetByGroup } from "./playersGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group:string) {
  try {
    /**
     * @ignite-teams:players-{groupName}
     * ex.: 
     *  @ignite-teams:players-ignite: ['player nº 1', 'player nº 2']
     *  @ignite-teams:players-friends: ['player nº 1', 'player nº 2']
     */

    const storedPlayers = await playersGetByGroup(group)

    const playerAlreadyExixts = storedPlayers.some(player => player.name === newPlayer.name)

    if(playerAlreadyExixts) {
      throw new AppError('Essa pessoa já está adicionada em um time.')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error;
  }
}