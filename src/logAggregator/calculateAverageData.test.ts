import { AggregatePlayerBaseResponse, buildAggregatePlayerBaseResponse } from '../model/AggregatePlayerStats';
import { calculatePlayerTimeAverageData } from './calculateAverageData';

describe('calculatePlayerTimeAverageData', () => {
    it('should generate an object with average damage per second from player summary data', () => {
        const playerData: AggregatePlayerBaseResponse = buildAggregatePlayerBaseResponse({
            totalDamage: 1000,
            playerActiveTime: 10000, //time in ms
        });

        expect(calculatePlayerTimeAverageData(playerData)).toEqual(
            expect.objectContaining({ playerAvgDamagePerSec: 100 }),
        );
    });

    it('should generate an object with average cleanses per second from player summary data', () => {
        const playerData: AggregatePlayerBaseResponse = buildAggregatePlayerBaseResponse({
            playerCleanses: 10,
            playerActiveTime: 10000, //time in ms
        });

        expect(calculatePlayerTimeAverageData(playerData)).toEqual(
            expect.objectContaining({ playerAvgCleansePerMin: 60 }),
        );
    });

    it('should round average damage per second to 5 decimal places', () => {
        const playerData: AggregatePlayerBaseResponse = buildAggregatePlayerBaseResponse({
            totalDamage: 1234,
            playerActiveTime: 1023, //time in ms
        });

        expect(calculatePlayerTimeAverageData(playerData)).toEqual(
            expect.objectContaining({ playerAvgDamagePerSec: 1206.25611 }),
        );
    });

    it('should round average cleanses per second to 2 decimal places', () => {
        const playerData: AggregatePlayerBaseResponse = buildAggregatePlayerBaseResponse({
            playerCleanses: 34,
            playerActiveTime: 1001, //time in ms
        });

        expect(calculatePlayerTimeAverageData(playerData)).toEqual(
            expect.objectContaining({ playerAvgCleansePerMin: 2037.96 }),
        );
    });
});
