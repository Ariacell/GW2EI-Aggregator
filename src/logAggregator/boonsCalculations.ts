import { StrippedDownBuffUptimeStats } from '../model/JsonBuffStats';
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
        if (aggregateBuffUptimes[buffUptime.boon]) {
            aggregateBuffUptimes[buffUptime.boon] = {
                boon: buffUptime.boon,
                uptime: aggregateBuffUptimes[buffUptime.boon].uptime + buffUptime.uptime,
            };
        } else
            aggregateBuffUptimes[buffUptime.boon] = {
                boon: aggregateBuffUptimes[buffUptime.boon],
                uptime: buffUptime.uptime,
            };
    });
    return aggregateBuffUptimes;
};
