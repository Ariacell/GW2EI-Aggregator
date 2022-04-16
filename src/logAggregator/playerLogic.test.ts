import { buildPlayer } from '../model/JsonPlayer';
import { calculateTotalActiveCombatTime } from './playerLogic';

describe('calculateTotalActiveCombatTime', () => {
    it('should calculate the sum of all active combat time in player logs', () => {
        const playerLogs = [buildPlayer({ activeTimes: [20] }), buildPlayer({ activeTimes: [30] })];

        expect(calculateTotalActiveCombatTime(playerLogs)).toEqual(50);
    });

    it('should calculate the sum of all active combat time in player logs with mismatched active time array lengths', () => {
        const playerLogs = [buildPlayer({ activeTimes: [20, 30] }), buildPlayer({ activeTimes: [30, 40, 5] })];

        expect(calculateTotalActiveCombatTime(playerLogs)).toEqual(125);
    });
});
