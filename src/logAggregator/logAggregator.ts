import { JSDOM } from 'jsdom';
import { msToTime } from '../util';
import { groupDataByCharacterName } from './groupDataByCharacterName';
import {
    calculateAverageDistToCom,
    calculatePlayerDamageStats,
    calculateTotalActiveCombatTime,
    calculateTotalCleanses,
    calculateTotalOtherCleanse,
    calculateTotalSelfCleanse,
} from './playerLogic';

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

    req.files.forEach((file: any) => {
        const jsonData = JSON.parse(file.buffer.toString());
        console.log(`Parsed data for log recorded at: ${jsonData.timeStart} by ${jsonData.recordedBy}`);
        logData.push(jsonData);
    });

    const players = groupDataByCharacterName(logData);

    const strippedDownStats = [];
    for (const [key, value] of Object.entries(players)) {
        strippedDownStats.push({
            playerName: key,
            playerRoundsActive: value.length,
            playerCleanses: calculateTotalCleanses(value),
            playerSelfCleanses: calculateTotalSelfCleanse(value),
            playerOtherCleanses: calculateTotalOtherCleanse(value),
            playerActiveTime: msToTime(calculateTotalActiveCombatTime(value)),
            playerDistanceToCom: calculateAverageDistToCom(value),
            ...calculatePlayerDamageStats(value),
        });
    }

    return strippedDownStats;
};
