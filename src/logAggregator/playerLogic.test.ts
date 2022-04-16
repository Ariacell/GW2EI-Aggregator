import { buildPlayer } from '../model/JsonPlayer';
import { buildSupportStats } from '../model/JsonSupportStats';
import {
    calculateTotalActiveCombatTime,
    calculateTotalCleanses,
    calculateTotalOtherCleanse,
    calculateTotalSelfCleanse,
    calculateSelfToOtherCleanseRatio,
} from './playerLogic';

describe('player logic', () => {
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

    describe('calculateTotalSelfCleanse', () => {
        it('should return total self cleanses without other cleanses added in', () => {
            const playerLogs = [
                buildPlayer({ support: [buildSupportStats({ condiCleanse: 2, condiCleanseSelf: 4 })] }),
            ];

            expect(calculateTotalSelfCleanse(playerLogs)).toEqual(4);
        });

        it('should return the total amount of self cleanses over multiple fights', () => {
            const playerLogs = [
                buildPlayer({ support: [buildSupportStats({ condiCleanse: 2, condiCleanseSelf: 4 })] }),
                buildPlayer({
                    support: [
                        buildSupportStats({ condiCleanse: 5, condiCleanseSelf: 2 }),
                        buildSupportStats({ condiCleanse: 8, condiCleanseSelf: 0 }),
                    ],
                }),
            ];

            expect(calculateTotalSelfCleanse(playerLogs)).toEqual(6);
        });
    });

    describe('calculateTotalOtherCleanse', () => {
        it('should return total self cleanses without self cleanses added in', () => {
            const playerLogs = [
                buildPlayer({ support: [buildSupportStats({ condiCleanse: 2, condiCleanseSelf: 4 })] }),
            ];

            expect(calculateTotalOtherCleanse(playerLogs)).toEqual(2);
        });

        it('should return the total amount of other cleanses over multiple fights without self cleanses', () => {
            const playerLogs = [
                buildPlayer({ support: [buildSupportStats({ condiCleanse: 2, condiCleanseSelf: 4 })] }),
                buildPlayer({
                    support: [
                        buildSupportStats({ condiCleanse: 5, condiCleanseSelf: 2 }),
                        buildSupportStats({ condiCleanse: 8, condiCleanseSelf: 0 }),
                    ],
                }),
            ];

            expect(calculateTotalOtherCleanse(playerLogs)).toEqual(15);
        });
    });

    describe('calculateTotalCleanses', () => {
        it('should return the total amount of cleanses over multiple fights', () => {
            const playerLogs = [
                buildPlayer({ support: [buildSupportStats({ condiCleanse: 2, condiCleanseSelf: 4 })] }),
            ];

            expect(calculateTotalCleanses(playerLogs)).toEqual(6);
        });

        it('should return the total amount of cleanses over multiple fights', () => {
            const playerLogs = [
                buildPlayer({ support: [buildSupportStats({ condiCleanse: 2, condiCleanseSelf: 4 })] }),
                buildPlayer({
                    support: [
                        buildSupportStats({ condiCleanse: 5, condiCleanseSelf: 2 }),
                        buildSupportStats({ condiCleanse: 8, condiCleanseSelf: 0 }),
                    ],
                }),
            ];

            expect(calculateTotalCleanses(playerLogs)).toEqual(21);
        });
    });
});
