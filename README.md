# Natali's Awesome Slot Machine Demo

### Game Guide

1. Player name is required to start game
2. Player will be given 100 spin credit to start
3. Each spin will deduct 1 spin credit
4. Each spin will generate 3 random numbers between 1 and 9
5. If all 3 numbers are the same, player will earn points of sum of the 3 numbers
6. Game goals are defined in `reward-config` json file (game-config.js)
7. Each game goal consists of minimum points and a reward (coins or spins)
8. Player will start from mission #1 and continue to the next one after completing the current mission
9. Once last mission is completed, the mission progress will reset to the mission defined in `repeatedIndex` value in `reward-config` file.
10. Natali may not be perfect, but she's a quick learner :) hire her!

### Happy game!

### How to start the game?
In terminal, run the following commands -

    tsc
    node dist/GameClient/app/index.js
