export interface RewardConfig {
    missions: Mission[];
    repeatedIndex: number;
}

export interface Reward {
    name: string;
    value: number;
}

export interface Mission {
    rewards: Reward[];
    pointsGoal: number;
}