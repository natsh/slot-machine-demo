"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ConfigLoader {
    static loadConfig() {
        const rawData = fs_1.default.readFileSync(path_1.default.resolve(__dirname, 'reward-config.json'), 'utf-8');
        this.config = JSON.parse(rawData);
    }
    static getConfig() {
        return this.config;
    }
}
exports.default = ConfigLoader;
