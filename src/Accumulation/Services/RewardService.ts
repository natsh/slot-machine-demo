import ConfigLoader from '../ConfigLoader';
import AccumulationRepository from '../Repositories/AccumulationRepository';
import { RewardConfig, Mission, Reward } from '../Models/RewardConfig';
import AccumulationService from './AccumulationService';
import { PlayerData } from '../Repositories/PlayerData';

class RewardService {
    private rewardConfig: any;

    constructor() {
        this.rewardConfig = ConfigLoader.getRewardConfig();
        if (!this.rewardConfig) {
            throw new Error('Failed to load reward configuration.');
        }
    }

    async processSpinResult(playerId: string, spinResult: number[]): Promise<PlayerData | undefined> {
        let playerData = await AccumulationRepository.getPlayerData(playerId);
        if (!playerData) {
            throw new Error('Player not found.');
        }

        const validatedPlayerData = playerData;

        if (validatedPlayerData.Spins <= 0) {
            console.error('No spins left for player:', playerId);
            return undefined;
        }

        this.deductSpin(validatedPlayerData);
        this.applySpinRewards(validatedPlayerData, spinResult);
        this.checkMissionCompletion(validatedPlayerData);

        await AccumulationService.updatePlayerData(playerId, playerData);
        return validatedPlayerData;
    }

    private deductSpin(playerData: PlayerData): void {
        playerData.Spins -= 1;
    }

    private applySpinRewards(playerData: PlayerData, spinResult: number[]): void {
        if (spinResult.every(value => value === spinResult[0])) {
            var sum = spinResult.reduce((sum, value) => sum + value, 0);
            playerData.Points += sum;
            console.log("Sweet! you got "+ sum + " more points!");
        }
    }

    private checkMissionCompletion(playerData: PlayerData): void {
        if (!this.rewardConfig) return;

        const mission = this.rewardConfig.missions[playerData.CurrentMissionIndex - 1];
        if (playerData.Points >= mission.pointsGoal) {
            this.applyMissionRewards(playerData, mission.rewards);
            this.moveToNextMission(playerData, mission.pointsGoal);
        }
    }

    private applyMissionRewards(playerData: PlayerData, rewards: Reward[]): void {
        for (const reward of rewards) {
            if (reward.name === 'coins') {
                playerData.Coins += reward.value;
            } else if (reward.name === 'spins') {
                playerData.Spins += reward.value;
            }

            this.displaySuccessMessage(reward.value, reward.name);
        }
    }

    private moveToNextMission(playerData: PlayerData, pointsGoal: number): void {
        const nextMissionIndex = playerData.CurrentMissionIndex + 1;
        if (nextMissionIndex > this.rewardConfig.missions.length) {
            playerData.CurrentMissionIndex = this.rewardConfig.repeatedIndex;
        } else {
            playerData.CurrentMissionIndex = nextMissionIndex;
        }
        playerData.Points -= pointsGoal;
    }

    private displaySuccessMessage(value: number, name: string) {
        console.log(`
+------------------------------------------+
|                                          |
|   🎉 Sweet! You completed a mission! 🎉  |
|                                          |
|   You received: ${value} ${name}!                |
|                                          |
+------------------------------------------+
`);
    }

}

export default new RewardService();