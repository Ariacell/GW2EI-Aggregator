import { JsonPlayer } from '../model/JsonPlayer';

export const calculateTotalActiveCombatTime = (playerLogs: JsonPlayer[]) => {
    return playerLogs
        .map((log) => log.activeTimes)
        .flat(1)
        .reduce((prev, curr) => prev + curr, 0);
};
