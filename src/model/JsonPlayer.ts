import { DefensesStats } from './JsonDefensiveStats';
import { DpsAllStats } from './JsonDpsStats';
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
    defenses: DefensesStats[];
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
    defenses: [],
};

export const buildPlayer = (overrides?: { [key in keyof Partial<JsonPlayer>]: JsonPlayer[key] }) => {
    return {
        ...defaultJsonPlayer,
        ...overrides,
    };
};
