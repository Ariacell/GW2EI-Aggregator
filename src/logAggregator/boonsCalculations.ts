import { StrippedDownBuffGenerationStats, StrippedDownBuffUptimeStats } from '../model/JsonBuffStats';
import { JsonPlayer } from '../model/JsonPlayer';

export const calculatePlayerBoonStats = (playerLogs: JsonPlayer[]): any => {
    const buffUptimes: StrippedDownBuffUptimeStats[] = playerLogs
        .flatMap((log) => log.buffUptimes)
        .map((buffUptimes) => {
            return {
                boon: buffUptimes.id,
                uptime: buffUptimes.buffData[0].uptime,
            };
        });
    const aggregateBuffUptimes: any = [];
    buffUptimes.forEach((buffUptime) => {
        if (playerLogs[0].account === 'Lufarianor.5964' && buffUptime.boon === 719)
            console.log('Buff number has value: ' + JSON.stringify(buffUptime));
        if (aggregateBuffUptimes[buffUptime.boon]) {
            aggregateBuffUptimes[buffUptime.boon] = {
                boon: buffUptime.boon,
                uptime: Number.parseFloat(
                    ((aggregateBuffUptimes[buffUptime.boon].uptime + buffUptime.uptime) / 2).toFixed(2),
                ),
            };
        } else
            aggregateBuffUptimes[buffUptime.boon] = {
                boon: aggregateBuffUptimes[buffUptime.boon],
                uptime: buffUptime.uptime,
            };
    });
    return aggregateBuffUptimes;
};

export const calculatePlayerGroupBoonStats = (playerLogs: JsonPlayer[]): StrippedDownBuffGenerationStats => {
    const buffUptimes: StrippedDownBuffGenerationStats[] = playerLogs
        .flatMap((log) => log.groupBuffs)
        .filter((buffData) => !!buffData)
        .map((groupBuffs) => {
            return {
                boon: groupBuffs.id,
                generation: groupBuffs.buffData[0].generation,
            };
        });
    const aggregateBuffUptimes: any = [];
    buffUptimes.forEach((buffUptime) => {
        console.log(buffUptime);
        if (aggregateBuffUptimes[buffUptime.boon]) {
            aggregateBuffUptimes[buffUptime.boon] = {
                boon: buffUptime.boon,
                generation: Number.parseFloat(
                    ((aggregateBuffUptimes[buffUptime.boon].generation + buffUptime.generation) / 2).toFixed(2),
                ),
            };
        } else
            aggregateBuffUptimes[buffUptime.boon] = {
                boon: aggregateBuffUptimes[buffUptime.boon],
                generation: buffUptime.generation,
            };
    });
    console.log(aggregateBuffUptimes);
    return aggregateBuffUptimes;
};

export const calculatePlayerSquadBoonStats = (playerLogs: JsonPlayer[]): StrippedDownBuffGenerationStats => {
    const buffUptimes: StrippedDownBuffGenerationStats[] = playerLogs
        .flatMap((log) => log.squadBuffs)
        .filter((buffData) => !!buffData)
        .map((squadBuffs) => {
            return {
                boon: squadBuffs.id,
                generation: squadBuffs.buffData[0].generation,
            };
        });
    const aggregateBuffUptimes: any = [];
    buffUptimes.forEach((buffUptime) => {
        if (aggregateBuffUptimes[buffUptime.boon]) {
            aggregateBuffUptimes[buffUptime.boon] = {
                boon: buffUptime.boon,
                generation: Number.parseFloat(
                    ((aggregateBuffUptimes[buffUptime.boon].generation + buffUptime.generation) / 2).toFixed(2),
                ),
            };
        } else
            aggregateBuffUptimes[buffUptime.boon] = {
                boon: aggregateBuffUptimes[buffUptime.boon],
                generation: buffUptime.generation,
            };
    });
    console.log(aggregateBuffUptimes);
    return aggregateBuffUptimes;
};
