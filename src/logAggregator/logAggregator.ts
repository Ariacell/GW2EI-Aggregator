import { JSDOM } from 'jsdom';
import { groupDataByCharacterName } from './groupDataByCharacterName';

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

    return players;
};
