import { BuffGeneration } from '../model/JsonBuffStats';
import { JsonLogData } from '../model/JsonLogData';
import { JsonPlayer } from '../model/JsonPlayer';
import { calculatePlayerGroupBoonStats } from './boonsCalculations';

const createDummyGroupSwiftnessBuffData: (generation: number) => BuffGeneration = (generation: number = 5.23) => ({
    id: 719,
    buffData: [
        {
            generation: generation,
            overstack: 5.855,
            wasted: 0,
            unknownExtended: 0,
            byExtension: 0,
            extended: 0,
        },
    ],
    states: [],
});

const player1 = {
    name: 'player 1',
    account: 'someAccountId.1234',
} as JsonPlayer;

describe('group generation', () => {
    const sampleLog1 = {
        players: [{ ...player1, groupBuffs: [createDummyGroupSwiftnessBuffData(28)] }],
    } as JsonLogData;
    const sampleLog2 = {
        players: [{ ...player1, groupBuffs: [createDummyGroupSwiftnessBuffData(10)] }],
    } as JsonLogData;

    it('should aggregated two logs', () => {
        const result = calculatePlayerGroupBoonStats([...sampleLog1.players, ...sampleLog2.players]);
        //@ts-ignore
        expect(result[719].generation).toEqual(19);
    });
});
