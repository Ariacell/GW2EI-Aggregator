import { BuffGeneration, BuffUptime } from './JsonBuffStats';
import { DefensesStats } from './JsonDefensiveStats';
import { DpsAllStats, DpsTargetStats } from './JsonDpsStats';
import { JsonMiscPlayerStats } from './JsonMiscPlayerStats';
import { SupportStats } from './JsonSupportStats';
import { PlayerProfessions } from './Professions';

export type JsonPlayer = {
    account: string;
    name: string;
    activeTimes: number[];
    group: number;
    hasCommanderTag: boolean;
    profession: PlayerProfessions;
    friendlyNPC: boolean;
    notInSquad: boolean;
    guildID: string;
    weapons: any[];
    support: SupportStats[];
    dpsAll: DpsAllStats[];
    dpsTargets: DpsTargetStats[][]; //Dps to targets is a nested array of damage per target, per phase
    defenses: DefensesStats[];
    statsAll: JsonMiscPlayerStats[];
    buffUptimes: BuffUptime[];
    groupBuffs: BuffGeneration[];
    squadBuffs: BuffGeneration[];
};

export const defaultJsonPlayer: JsonPlayer = {
    account: 'someAccountName.1234',
    name: 'player 1',
    activeTimes: [1234, 4567],
    group: 0,
    hasCommanderTag: false,
    profession: PlayerProfessions.ELEMENTALIST,
    friendlyNPC: false,
    notInSquad: false,
    guildID: 'some-guild-uuid',
    weapons: [],
    support: [],
    dpsAll: [],
    dpsTargets: [],
    defenses: [],
    statsAll: [],
    buffUptimes: [],
    groupBuffs: [],
    squadBuffs: [],
};

export const buildPlayer = (overrides?: { [key in keyof Partial<JsonPlayer>]: JsonPlayer[key] }) => {
    return {
        ...defaultJsonPlayer,
        ...overrides,
    };
};
