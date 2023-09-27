import { PlayerData } from "../Repositories/PlayerData";
import AccumulationService from '../Services/AccumulationService';
import RewardService from '../Services/RewardService';

class AccumulationController {
    // PUT /Accumulation?playerId={playerId}
    async initializePlayer(playerId: string): Promise<void> {
        await AccumulationService.initializePlayer(playerId);
    }

    // GET /Accumulation?playerId={playerId}
    async getPlayerData(playerId: string) {
        return await AccumulationService.getPlayerData(playerId);
    }

    // POST /Accumulation/PlayerId/{playerId}/Reward?numbers={numbers}
    async processSpinResult(playerId: string, spinResult: number[]): Promise<PlayerData | undefined> {
        return await RewardService.processSpinResult(playerId, spinResult);
    }
}

export default new AccumulationController();
