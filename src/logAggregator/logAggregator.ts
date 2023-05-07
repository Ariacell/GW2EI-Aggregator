import { JSDOM } from 'jsdom';
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
    calculateAveragePlayerDownsContribution,
    calculatePlayerDamageStats,
    calculatePlayerDamageTakenStats as calculatePlayerDefensiveStats,
    calculatePlayerTargetDamageStats,
    calculateTotalActiveCombatTime,
    calculateTotalCleanses,
    calculateTotalInterrupts,
    calculateTotalOtherCleanse,
    calculateTotalSelfCleanse,
    calculateTotalStrips,
    getPlayerAccountName,
    getPlayerProfession,
} from './playerLogic';
import AdmZip from 'adm-zip';

//Not currently in use as dangerous parsing of HTML to retrieve logs is not a great solution
export const aggregateHtmlLogs = (req: any, res: any) => {
    console.log('Attempting to aggregate html log files');

    const logData: any = [];

    req.files.forEach((file: any) => {
        let data = file.buffer.toString();
        const dom: JSDOM = new JSDOM(`${data}`, { runScripts: 'dangerously' });
        logData.push(dom.window.logData);
    });

    return logData;
};

//
export const aggregateJSONLogs = (req: any, res: any) => {
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
            playerAccount: getPlayerAccountName(value),
            playerProfession: getPlayerProfession(value),
            playerRoundsActive: value.length,
            playerActiveTime: calculateTotalActiveCombatTime(value),
            playerStrips: calculateTotalStrips(value),
            playerInterrupts: calculateTotalInterrupts(value),
            playerCleanses: calculateTotalCleanses(value),
            playerSelfCleanses: calculateTotalSelfCleanse(value),
            playerOtherCleanses: calculateTotalOtherCleanse(value),
            playerDistanceToCom: calculateAverageDistToCom(value),
            playerDownsContribution: calculateAveragePlayerDownsContribution(value),
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
