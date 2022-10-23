import { AggregatePlayerDamageStats, AggregatePlayerTargetDamageStats } from './AggregatePlayerDamageStats';
import { AggregatePlayerStatsTimeAvg } from './AggregatePlayerStatsTimeAvg';
import { AggregatePlayerSupportStats } from './AggregatePlayerSupportStats';
import { AggregatedBuffGenerationStats, AggregatedBuffUptimeStats } from './JsonBuffStats';

export type AggregatePlayerBaseStats = {
    playerName: string;
    playerRoundsActive: number;
    playerActiveTime: number;
};

export type AggregatePlayerOverviewStats = {
    playerDistanceToCom: number;
};

export type AggregatePlayerBoonsStats = {
    playerBoons: { [key: string]: AggregatedBuffUptimeStats };
    playerBoonsGroup: { [key: string]: AggregatedBuffGenerationStats };
    playerBoonsSquad: { [key: string]: AggregatedBuffUptimeStats };
};

export type AggregatePlayerBaseResponse = AggregatePlayerBaseStats &
    AggregatePlayerOverviewStats &
    AggregatePlayerSupportStats &
    AggregatePlayerDamageStats &
    AggregatePlayerTargetDamageStats &
    AggregatePlayerBoonsStats;

const defaultAggregatePlayerBaseResponse: AggregatePlayerBaseResponse = {
    playerName: 'some player',
    playerRoundsActive: 0,
    playerActiveTime: 0,
    playerDistanceToCom: 0,
    playerCleanses: 0,
    playerSelfCleanses: 0,
    playerOtherCleanses: 0,
    totalDamage: 0,
    totalPowerDamage: 0,
    totalCondiDamage: 0,
    totalTargetDamage: 0,
    totalTargetPowerDamage: 0,
    totalTargetCondiDamage: 0,
    playerBoons: {},
    playerBoonsSquad: {},
    playerBoonsGroup: {},
};

export const buildAggregatePlayerBaseResponse = (overrides?: {
    [key in keyof Partial<AggregatePlayerBaseResponse>]: AggregatePlayerBaseResponse[key];
}) => {
    return {
        ...defaultAggregatePlayerBaseResponse,
        ...overrides,
    };
};

export type AggregateLogResponse = AggregatePlayerBaseStats &
    AggregatePlayerOverviewStats &
    AggregatePlayerSupportStats &
    AggregatePlayerDamageStats &
    AggregatePlayerTargetDamageStats &
    AggregatePlayerBoonsStats &
    AggregatePlayerStatsTimeAvg;
