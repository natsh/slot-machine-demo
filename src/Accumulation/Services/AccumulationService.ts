import AccumulationRepository from '../Repositories/AccumulationRepository';
import { PlayerData } from "../Repositories/PlayerData";

class AccumulationService {
    
    async initializePlayer(playerId: string): Promise<void> {
        const initialData = {
            PlayerId: playerId,
            Coins: 0,
            Spins: 100,
            Points: 0,
            CurrentMissionIndex: 1
        };
        await AccumulationRepository.savePlayerData(playerId, initialData);
    }

    async getPlayerData(playerId: string) {
        return await AccumulationRepository.getPlayerData(playerId);
    }
    
    async updatePlayerData(playerId: string, playerData: PlayerData) {
        await AccumulationRepository.savePlayerData(playerId, playerData);
    }
}

export default new AccumulationService();
