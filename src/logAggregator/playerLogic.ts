import { AggregatePlayerDamageStats, AggregatePlayerTargetDamageStats } from '../model/AggregatePlayerDamageStats';
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

export const calculatePlayerDamageStats = (playerLogs: JsonPlayer[]): AggregatePlayerDamageStats => {
    return playerLogs
        .flatMap((log) => log.dpsAll)
        .map((dpsStats) => {
            return {
                totalDamage: dpsStats.damage,
                totalPowerDamage: dpsStats.powerDamage,
                totalCondiDamage: dpsStats.condiDamage,
            };
        })
        .reduce(
            (damageTotals, currentStats) => {
                //@ts-ignore
                Object.keys(damageTotals).forEach((key) => (damageTotals[key] += currentStats[key]));
                return damageTotals;
            },
            {
                totalDamage: 0,
                totalPowerDamage: 0,
                totalCondiDamage: 0,
            },
        );
};

export const calculatePlayerTargetDamageStats = (playerLogs: JsonPlayer[]): AggregatePlayerTargetDamageStats => {
    return playerLogs
        .flatMap((log) => log.dpsTargets)
        .flat(1)
        .map((targetDpsStats) => {
            return {
                totalTargetDamage: targetDpsStats.damage,
                totalTargetPowerDamage: targetDpsStats.powerDamage,
                totalTargetCondiDamage: targetDpsStats.condiDamage,
            };
        })
        .reduce(
            (damageTotals, currentStats) => {
                //@ts-ignore
                Object.keys(damageTotals).forEach((key) => (damageTotals[key] += currentStats[key]));
                return damageTotals;
            },
            {
                totalTargetDamage: 0,
                totalTargetPowerDamage: 0,
                totalTargetCondiDamage: 0,
            },
        );
};

export const calculateTotalRoundsActive = (playerLogs: JsonPlayer[], numberOfLogs: number) => {};
