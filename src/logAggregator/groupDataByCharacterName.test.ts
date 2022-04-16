import { JsonLogData } from '../model/JsonLogData';
import { JsonPlayer } from '../model/JsonPlayer';
import { groupDataByCharacterName, PlayerDataGroupedByName } from './groupDataByCharacterName';

const player1 = {
    name: 'player 1',
    account: 'someAccountId.1234',
} as JsonPlayer;
const player2 = {
    name: 'player 2',
    account: 'someAccountId.4567',
} as JsonPlayer;
const player3 = {
    name: 'player 3',
    account: 'someAccountId.7890',
} as JsonPlayer;
const player4 = {
    name: 'player 4',
    account: 'someAccountId.2389',
} as JsonPlayer;

describe('groupDataByCharacterName', () => {
    it('should take a group of logs and return logs split by each individual character', () => {
        const sampleLog1 = {
            players: [player1, player2, player3],
        } as JsonLogData;
        const sampleLog2 = {
            players: [player3, player1, player4],
        } as JsonLogData;

        const expectedActivePlayers: PlayerDataGroupedByName = {
            'player 1': [player1, player1],
            'player 2': [player2],
            'player 3': [player3, player3],
            'player 4': [player4],
        };

        expect(groupDataByCharacterName([sampleLog1, sampleLog2])).toEqual(expectedActivePlayers);
    });
});
