import { buildPlayerMiscStats } from '../model/JsonMiscPlayerStats';
import { buildPlayer } from '../model/JsonPlayer';
import { buildSupportStats } from '../model/JsonSupportStats';
import {
    calculateTotalActiveCombatTime,
    calculateTotalCleanses,
    calculateTotalOtherCleanse,
    calculateTotalSelfCleanse,
    calculateAverageDistToCom,
} from './playerLogic';

describe('player logic', () => {
    describe('support stats', () => {
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

    describe('misc combat stats', () => {
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

        describe('calculateAverageDistanceToCommander', () => {
            it('should take average of all distances to commander', () => {
                const playerLogs = [
                    buildPlayer({ statsAll: [buildPlayerMiscStats({ distToCom: 110.0 })] }),
                    buildPlayer({
                        statsAll: [
                            buildPlayerMiscStats({ distToCom: 149.5 }),
                            buildPlayerMiscStats({ distToCom: 199.5 }),
                        ],
                    }),
                ];
                expect(calculateAverageDistToCom(playerLogs)).toEqual(153); // 459/3
            });

            it('should round values', () => {
                const playerLogsUp = [
                    buildPlayer({ statsAll: [buildPlayerMiscStats({ distToCom: 5 })] }),
                    buildPlayer({
                        statsAll: [buildPlayerMiscStats({ distToCom: 10 }), buildPlayerMiscStats({ distToCom: 5 })],
                    }),
                ];
                expect(calculateAverageDistToCom(playerLogsUp)).toEqual(7); // 20/3

                const playerLogsDown = [
                    buildPlayer({ statsAll: [buildPlayerMiscStats({ distToCom: 5 })] }),
                    buildPlayer({
                        statsAll: [buildPlayerMiscStats({ distToCom: 10 }), buildPlayerMiscStats({ distToCom: 4 })],
                    }),
                ];
                expect(calculateAverageDistToCom(playerLogsDown)).toEqual(6); // 19/3
            });

            it('should ignore 0 values when calculating average', () => {
                const playerLogs = [
                    buildPlayer({ statsAll: [buildPlayerMiscStats({ distToCom: 100.5 })] }),
                    buildPlayer({
                        statsAll: [buildPlayerMiscStats({ distToCom: 0 }), buildPlayerMiscStats({ distToCom: 199.5 })],
                    }),
                ];
                expect(calculateAverageDistToCom(playerLogs)).toEqual(150); // 300/2
            });
        });
    });
});
