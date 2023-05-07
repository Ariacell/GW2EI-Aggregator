import { AggregatePlayerBaseResponse } from '../model/AggregatePlayerStats';
import { AggregatePlayerStatsTimeAvg } from '../model/AggregatePlayerStatsTimeAvg';

export const calculatePlayerTimeAverageData = (
    playerData: AggregatePlayerBaseResponse,
): AggregatePlayerStatsTimeAvg => {
    return {
        playerAvgInterrupts: parseFloat(
            ((playerData.playerInterrupts / (playerData.playerActiveTime / 1000)) * 60).toFixed(2),
        ),
        playerAvgDodgeCount: parseFloat(
            ((playerData.dodgeCount / (playerData.playerActiveTime / 1000)) * 60).toFixed(2),
        ),
        playerAvgDamagePerSec: parseFloat((playerData.totalDamage / (playerData.playerActiveTime / 1000)).toFixed(5)),
        playerAvgCleansePerMin: parseFloat(
            ((playerData.playerCleanses / (playerData.playerActiveTime / 1000)) * 60).toFixed(2),
        ),
        playerAvgStripsPerMin: parseFloat(
            ((playerData.playerStrips / (playerData.playerActiveTime / 1000)) * 60).toFixed(2),
        ),
        playerAvgDamageTaken: parseFloat(
            (playerData.playerDamageTaken / (playerData.playerActiveTime / 1000)).toFixed(2),
        ),
        playerAvgDownsPerMin: parseFloat(
            ((playerData.playerDowns / (playerData.playerActiveTime / 1000)) * 60).toFixed(2),
        ),
        playerAvgDeathsPerMin: parseFloat(
            ((playerData.playerDeaths / (playerData.playerActiveTime / 1000)) * 60).toFixed(2),
        ),
    };
};
