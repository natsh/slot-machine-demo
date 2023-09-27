import * as readline from 'readline';
import AccumulationController from '../../Accumulation/Controllers/AccumulationController';
import Spinner from '../Services/Spinner';
import { PlayerData } from '../../Accumulation/Repositories/PlayerData';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter Player Name: ', (playerName) => {
    rl.close();  // Close the readline interface
    startGame(playerName);
});

async function startGame(playerName: string) {
    console.log(`Starting Slot Machine Game for ${playerName}`);
    await AccumulationController.initializePlayer(playerName);
    spinAndPrompt(playerName);
}

async function spinAndPrompt(playerName: string) {
    const playerData = await getPlayerDataOrExit(playerName);
    if (!playerData) return;  // Exit if no player data or no spins available

    const spinResult = Spinner.spin();
    displaySpinResult(spinResult);

    const updatedPlayerData = await processSpinAndUpdatePlayerData(playerName, spinResult);
    if (!updatedPlayerData) return;  // Exit if spin processing fails

    displayPlayerBalance(updatedPlayerData);

    if (updatedPlayerData.Spins > 0) {
        promptContinuePlaying(playerName);
    } else {
        console.log('No more spins available.');
    }
}

async function getPlayerDataOrExit(playerName: string): Promise<PlayerData | null> {
    const playerData = await AccumulationController.getPlayerData(playerName);
    if (!playerData || playerData.Spins <= 0) {
        console.log('No more spins available.');
        return null;
    }
    return playerData;
}

async function processSpinAndUpdatePlayerData(playerName: string, spinResult: number[]): Promise<PlayerData | null> {
    const updatedPlayerData = await AccumulationController.processSpinResult(playerName, spinResult);
    if (!updatedPlayerData) {
        console.error('Failed to process spin result.');
        return null;
    }
    return updatedPlayerData;
}

function promptContinuePlaying(playerName: string) {
    const rlPrompt = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rlPrompt.question('Do you wish to continue playing? (yes/no): ', (answer) => {
        rlPrompt.close();
        if (answer.toLowerCase() === 'yes') {
            spinAndPrompt(playerName);
        } else {
            console.log('Thank you for playing!');
        }
    });
}

function displayPlayerBalance(playerData: PlayerData) {
    const formattedCoins = playerData.Coins.toString().padEnd(5, ' ');
    const formattedSpins = playerData.Spins.toString().padEnd(5, ' ');
    const formattedPoints = playerData.Points.toString().padEnd(5, ' ');
    const formattedCurrentMissionIndex = playerData.CurrentMissionIndex.toString().padEnd(5, ' ');

    console.log(`
+-------+-------+--------+----------+
| Coins | Spins | Points |  Mission |
+-------+-------+--------+----------+
| ${formattedCoins} | ${formattedSpins} | ${formattedPoints}  | ${formattedCurrentMissionIndex}    |
+-------+-------+--------+----------+
    `);
}

function displaySpinResult(spinResult: number[]): void {
    const boxWidth = spinResult.length * 3 + 2;  // 3 characters per number (1 digit + 2 spaces) + 2 for borders

    const topBottomBorder = '+' + '-'.repeat(boxWidth) + '+';
    const numbersLine = '| ' + spinResult.join(' | ') + ' |';

    console.log(topBottomBorder);
    console.log(numbersLine);
    console.log(topBottomBorder);
}