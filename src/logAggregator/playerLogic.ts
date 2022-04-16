import { JsonPlayer } from '../model/JsonPlayer';

export const calculateTotalActiveCombatTime = (playerLogs: JsonPlayer[]): number => {
    return playerLogs.flatMap((log) => log.activeTimes).reduce((prev, curr) => prev + curr, 0);
};

export const calculateTotalSelfCleanse = (playerLogs: JsonPlayer[]): number => {
    return playerLogs
        .flatMap((log) => log.support)
        .map((support) => support.condiCleanseSelf)
        .reduce((prev, curr) => prev + curr, 0);
};

export const calculateTotalOtherCleanse = (playerLogs: JsonPlayer[]): number => {
    return playerLogs
        .flatMap((log) => log.support)
        .map((support) => support.condiCleanse)
        .reduce((prev, curr) => prev + curr, 0);
};

export const calculateTotalCleanses = (playerLogs: JsonPlayer[]): number => {
    return playerLogs
        .flatMap((log) => log.support)
        .map((support) => support.condiCleanse + support.condiCleanseSelf)
        .reduce((prev, curr) => prev + curr, 0);
};

export const calculateAverageDistToCom = (playerLogs: JsonPlayer[]): number => {
    const miscStats = playerLogs.flatMap((log) => log.statsAll).filter((stats) => stats.distToCom != 0);
    return Math.round(
        miscStats.map((stats) => stats.distToCom).reduce((prev, curr) => prev + curr, 0.0) / miscStats.length,
    );
};
