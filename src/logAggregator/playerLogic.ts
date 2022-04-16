import { JsonPlayer } from '../model/JsonPlayer';

export const calculateTotalActiveCombatTime = (playerLogs: JsonPlayer[]) => {
    return playerLogs.flatMap((log) => log.activeTimes).reduce((prev, curr) => prev + curr, 0);
};

export const calculateTotalSelfCleanse = (playerLogs: JsonPlayer[]) => {
    return playerLogs
        .flatMap((log) => log.support)
        .map((support) => support.condiCleanseSelf)
        .reduce((prev, curr) => prev + curr, 0);
};

export const calculateTotalOtherCleanse = (playerLogs: JsonPlayer[]) => {
    return playerLogs
        .flatMap((log) => log.support)
        .map((support) => support.condiCleanse)
        .reduce((prev, curr) => prev + curr, 0);
};

export const calculateTotalCleanses = (playerLogs: JsonPlayer[]) => {
    return playerLogs
        .flatMap((log) => log.support)
        .map((support) => support.condiCleanse + support.condiCleanseSelf)
        .reduce((prev, curr) => prev + curr, 0);
};
