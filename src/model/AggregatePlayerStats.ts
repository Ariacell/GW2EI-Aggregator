import { AggregatePlayerDamageStats, AggregatePlayerTargetDamageStats } from './AggregatePlayerDamageStats';
import { AggregatePlayerDefenseStats } from './AggregatePlayerDefenseStats';
import { AggregatePlayerStatsTimeAvg } from './AggregatePlayerStatsTimeAvg';
import { AggregatePlayerSupportStats } from './AggregatePlayerSupportStats';
import { AggregatedBuffGenerationStats, AggregatedBuffUptimeStats } from './JsonBuffStats';

export type AggregatePlayerBaseStats = {
    playerName: string;
    playerAccount: string;
    playerProfession: string;
    playerRoundsActive: number;
    playerActiveTime: number; // Time active in seconds
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
    AggregatePlayerDefenseStats &
    AggregatePlayerDamageStats &
    AggregatePlayerTargetDamageStats &
    AggregatePlayerBoonsStats;

const defaultAggregatePlayerBaseResponse: AggregatePlayerBaseResponse = {
    playerName: 'some player',
    playerAccount: 'someaccount.1234',
    playerProfession: 'Commando',
    playerRoundsActive: 0,
    playerActiveTime: 0,
    playerDistanceToCom: 0,
    playerStrips: 0,
    playerInterrupts: 0,
    playerCleanses: 0,
    playerSelfCleanses: 0,
    playerOtherCleanses: 0,
    playerDowns: 0,
    dodgeCount: 0,
    playerResurrects: 0,
    playerResurrectTime: 0,
    playerDeaths: 0,
    playerDamageTaken: 0,
    playerBarrierDamageTaken: 0,
    totalDamage: 0,
    totalDownsContribution: 0,
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
    AggregatePlayerDefenseStats &
    AggregatePlayerDamageStats &
    AggregatePlayerTargetDamageStats &
    AggregatePlayerBoonsStats &
    AggregatePlayerStatsTimeAvg;
