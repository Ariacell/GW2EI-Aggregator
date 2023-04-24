import { AggregateLogResponse, AggregatePlayerBaseResponse } from '../model/AggregatePlayerStats';
import {
    calculatePlayerBoonStats,
    calculatePlayerGroupBoonStats,
    calculatePlayerSquadBoonStats,
} from './boonsCalculations';
import { calculatePlayerTimeAverageData } from './calculateAverageData';
import { groupDataByCharacterName } from './groupDataByCharacterName';
import {
    calculateAverageDistToCom,
    calculateAverageDistToSquad,
    calculatePlayerDamageStats,
    calculatePlayerDamageTakenStats as calculatePlayerDefensiveStats,
    calculatePlayerTargetDamageStats,
    calculateTotalActiveCombatTime,
    calculateTotalCleanses,
    calculateTotalOtherCleanse,
    calculateTotalSelfCleanse,
    calculateTotalStrips,
} from './playerLogic';
import AdmZip from 'adm-zip';

//
export const aggregateJSONLogs = (req: any) => {
    console.log('Attempting to aggregate JSON log files');

    const logData: any = [];
    // const zip = fs.createReadStream(req.files[0].buffer).pipe(unzipper.Parse({ forceStream: true }));
    const zip = new AdmZip(req.files[0].buffer);
    console.log('Recieved zipped file: ', zip);
    const zipEntries = zip.getEntries();

    zipEntries.forEach((file: any) => {
        console.log('Processing entry: ', file.getData());
        const jsonData = JSON.parse(file.getData().toString());
        console.log(`Parsed data for log recorded at: ${jsonData.timeStart} by ${jsonData.recordedBy}`);
        logData.push(jsonData);
    });
    // req.files.forEach((file: any) => {
    //     const jsonData = JSON.parse(file.buffer.toString());
    //     console.log(`Parsed data for log recorded at: ${jsonData.timeStart} by ${jsonData.recordedBy}`);
    //     logData.push(jsonData);
    // });

    const players = groupDataByCharacterName(logData);

    const strippedDownStats: AggregatePlayerBaseResponse[] = [];
    for (const [key, value] of Object.entries(players)) {
        strippedDownStats.push({
            playerName: key,
            playerRoundsActive: value.length,
            playerActiveTime: calculateTotalActiveCombatTime(value),
            playerStrips: calculateTotalStrips(value),
            playerCleanses: calculateTotalCleanses(value),
            playerSelfCleanses: calculateTotalSelfCleanse(value),
            playerOtherCleanses: calculateTotalOtherCleanse(value),
            playerDistanceToCom: calculateAverageDistToCom(value),
            playerDistanceToStack: calculateAverageDistToSquad(value),
            // 'playerAvgDamageTaken',
            playerBoons: { ...calculatePlayerBoonStats(value) },
            //@ts-ignore
            playerBoonsGroup: { ...calculatePlayerGroupBoonStats(value) },
            //@ts-ignore
            playerBoonsSquad: { ...calculatePlayerSquadBoonStats(value) },
            ...calculatePlayerDefensiveStats(value),
            ...calculatePlayerDamageStats(value),
            ...calculatePlayerTargetDamageStats(value),
        });
    }
    const statsStitchedAverages: AggregateLogResponse[] = [];
    strippedDownStats.forEach((playerStats) => {
        statsStitchedAverages.push({ ...playerStats, ...calculatePlayerTimeAverageData(playerStats) });
    });

    console.log('Returning aggregated stats: ', statsStitchedAverages[0]);

    return statsStitchedAverages;
};
