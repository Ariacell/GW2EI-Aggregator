import { AggregatePlayerDamageStats, AggregatePlayerTargetDamageStats } from '../model/AggregatePlayerDamageStats';
import { AggregatePlayerDefenseStats } from '../model/AggregatePlayerDefenseStats';
import { AggregatedBuffUptimeStats, BuffUptimeStats, StrippedDownBuffUptimeStats } from '../model/JsonBuffStats';
import { JsonPlayer } from '../model/JsonPlayer';

export const calculateTotalActiveCombatTime = (playerLogs: JsonPlayer[]): number => {
    return playerLogs.flatMap((log) => log.activeTimes).reduce((prev, curr) => prev + curr, 0);
};

export const getPlayerAccountName = (playerLogs: JsonPlayer[]): string => {
    return playerLogs.flatMap((log) => log.account)[0];
};
export const getPlayerProfession = (playerLogs: JsonPlayer[]): string => {
    return playerLogs.flatMap((log) => log.profession)[0];
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

export const calculateTotalStrips = (playerLogs: JsonPlayer[]): number => {
    return playerLogs
        .flatMap((log) => log.support)
        .map((support) => support.boonStrips)
        .reduce((prev, curr) => prev + curr, 0);
};
export const calculateTotalInterrupts = (playerLogs: JsonPlayer[]): number => {
    return playerLogs
        .flatMap((log) => log.statsAll)
        .map((allStats) => allStats.interrupts)
        .reduce((prev, curr) => prev + curr, 0);
};

export const calculateAverageDistToCom = (playerLogs: JsonPlayer[]): number => {
    const miscStats = playerLogs.flatMap((log) => log.statsAll).filter((stats) => stats.distToCom != 0);
    return Math.round(
        miscStats.map((stats) => stats.distToCom).reduce((prev, curr) => prev + curr, 0.0) / miscStats.length,
    );
};
export const calculateAveragePlayerDownsContribution = (playerLogs: JsonPlayer[]): number => {
    const miscStats = playerLogs.flatMap((log) => log.statsAll).filter((stats) => stats.downContribution != undefined);
    return Math.round(
        miscStats.map((stats) => stats.downContribution).reduce((prev, curr) => prev + curr, 0.0) / miscStats.length,
    );
};
export const calculateTotalPlayerDownsContribution = (playerLogs: JsonPlayer[]): number => {
    const miscStats = playerLogs.flatMap((log) => log.statsAll).filter((stats) => stats.downContribution != undefined);
    return miscStats.map((stats) => stats.downContribution).reduce((prev, curr) => prev + curr, 0.0);
};

export const calculateAverageDistToSquad = (playerLogs: JsonPlayer[]): number => {
    const miscStats = playerLogs.flatMap((log) => log.statsAll).filter((stats) => stats.stackDist != 0);
    return Math.round(
        miscStats.map((stats) => stats.stackDist).reduce((prev, curr) => prev + curr, 0.0) / miscStats.length,
    );
};

// export const calculateTotalPlayerDeaths = (playerLogs: JsonPlayer[]): number => {
//     const miscStats = playerLogs.flatMap((log) => log.defenses).filter((stats) => stats.deadCount != 0);
//     return miscStats.length;
// };
// export const calculateTotalPlayerDowns = (playerLogs: JsonPlayer[]): number => {
//     const miscStats = playerLogs.flatMap((log) => log.defenses).filter((stats) => stats.downCount != 0);
//     return miscStats.length;
// };

export const calculatePlayerDamageStats = (playerLogs: JsonPlayer[]): AggregatePlayerDamageStats => {
    return playerLogs
        .map((log) => {
            return {
                totalDamage: log.dpsAll[0].damage,
                totalDownsContribution: log.statsAll[0].downContribution,
                totalPowerDamage: log.dpsAll[0].powerDamage,
                totalCondiDamage: log.dpsAll[0].condiDamage,
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
                totalDownsContribution: 0,
                totalPowerDamage: 0,
                totalCondiDamage: 0,
            },
        );
};

export const calculatePlayerDamageTakenStats = (playerLogs: JsonPlayer[]): AggregatePlayerDefenseStats => {
    return playerLogs
        .flatMap((log) => log.defenses)
        .map((defenses) => {
            return {
                dodgeCount: defenses.dodgeCount,
                playerDamageTaken: defenses.damageTaken,
                playerBarrierDamageTaken: defenses.damageBarrier,
                playerDowns: defenses.downCount,
                playerDeaths: defenses.deadCount,
            };
        })
        .reduce(
            (damageTotals, currentStats) => {
                //@ts-ignore
                Object.keys(damageTotals).forEach((key) => (damageTotals[key] += currentStats[key]));
                return damageTotals;
            },
            {
                dodgeCount: 0,
                playerDamageTaken: 0,
                playerBarrierDamageTaken: 0,
                playerDowns: 0,
                playerDeaths: 0,
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
