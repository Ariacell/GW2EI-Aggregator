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
    };
};
