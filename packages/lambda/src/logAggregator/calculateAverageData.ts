import { AggregatePlayerBaseResponse } from '../model/AggregatePlayerStats';
import { AggregatePlayerStatsTimeAvg } from '../model/AggregatePlayerStatsTimeAvg';

export const calculatePlayerTimeAverageData = (
    playerData: AggregatePlayerBaseResponse,
): AggregatePlayerStatsTimeAvg => {
    return {
        playerAvgDamagePerSec: parseFloat((playerData.totalDamage / (playerData.playerActiveTime / 1000)).toFixed(2)),
        playerAvgCleansePerSec: parseFloat(
            (playerData.playerCleanses / (playerData.playerActiveTime / 1000)).toFixed(2),
        ),
        playerAvgStripsPerSec: parseFloat((playerData.playerStrips / (playerData.playerActiveTime / 1000)).toFixed(2)),
        playerAvgDamageTaken: parseFloat(
            (playerData.playerDamageTaken / (playerData.playerActiveTime / 1000)).toFixed(2),
        ),
        playerAvgDownsPerSec: parseFloat((playerData.playerDowns / (playerData.playerActiveTime / 1000)).toFixed(5)),
        playerAvgDeathsPerSec: parseFloat((playerData.playerDeaths / (playerData.playerActiveTime / 1000)).toFixed(5)),
    };
};
