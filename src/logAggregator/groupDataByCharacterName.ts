import { JsonLogData } from '../model/JsonLogData';
import { JsonPlayer } from '../model/JsonPlayer';

export type PlayerDataGroupedByName = {
    [key: string]: JsonPlayer[];
};

export const groupDataByCharacterName = (logData: JsonLogData[]) => {
    const activePlayers: PlayerDataGroupedByName = {};

    logData.forEach((log: any) => {
        log.players.forEach((player: JsonPlayer) => {
            if (activePlayers[player.name]) {
                activePlayers[player.name].push(player);
            } else {
                activePlayers[player.name] = [player];
            }
        });
    });

    return activePlayers;
};
