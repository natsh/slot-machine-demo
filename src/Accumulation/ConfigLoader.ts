import { RewardConfig } from './Models/RewardConfig';
import fs from 'fs';
import path from 'path';

class ConfigLoader {
    private rewardConfig: RewardConfig | null = null;

    constructor() {
        this.loadConfig();
    }

    private loadConfig(): void {
        const configPath = path.resolve(__dirname, '../../reward-config.json');
        const configJSON = fs.readFileSync(configPath, 'utf-8');
        this.rewardConfig = JSON.parse(configJSON);
    }

    public getRewardConfig(): RewardConfig | null {
        return this.rewardConfig;
    }
}

export default new ConfigLoader();
