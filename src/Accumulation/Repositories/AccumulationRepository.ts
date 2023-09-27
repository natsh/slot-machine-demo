import { PlayerData } from "./PlayerData";
import RedisClient from "./redisClient";

class AccumulationRepository {
    async savePlayerData(playerId: string, playerData: PlayerData): Promise<void> {
        await RedisClient.set(playerId, JSON.stringify(playerData));
    }

    async getPlayerData(playerId: string): Promise<PlayerData | null> {
        const playerData = await RedisClient.get(playerId);
        return playerData ? JSON.parse(playerData) : null;
    }
}

export default new AccumulationRepository();
