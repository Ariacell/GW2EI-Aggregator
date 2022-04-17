export type DpsAllStats = {
    dps: number;
    damage: number;
    condiDps: number;
    condiDamage: number;
    powerDps: number;
    powerDamage: number;
    breakbarDamage: number;
    actorDps: number;
    actorDamage: number;
    actorCondiDps: number;
    actorCondiDamage: number;
    actorPowerDps: number;
    actorPowerDamage: number;
    actorBreakbarDamage: number;
};

export const defaultPlayerDpsStats = {
    dps: 0,
    damage: 0,
    condiDps: 0,
    condiDamage: 0,
    powerDps: 0,
    powerDamage: 0,
    breakbarDamage: 0,
    actorDps: 0,
    actorDamage: 0,
    actorCondiDps: 0,
    actorCondiDamage: 0,
    actorPowerDps: 0,
    actorPowerDamage: 0,
    actorBreakbarDamage: 0,
};

export const buildPlayerDpsStats = (overrides?: {
    [key in keyof Partial<DpsAllStats>]: DpsAllStats[key];
}) => {
    return {
        ...defaultPlayerDpsStats,
        ...overrides,
    };
};

export type DpsTargetStats = {
    dps: number;
    damage: number;
    condiDps: number;
    condiDamage: number;
    powerDps: number;
    powerDamage: number;
    breakbarDamage: number;
};

export const defaultPlayerTargetDpsStats = {
    dps: 0,
    damage: 0,
    condiDps: 0,
    condiDamage: 0,
    powerDps: 0,
    powerDamage: 0,
    breakbarDamage: 0,
};

export const buildPlayerTargetDpsStats = (overrides?: {
    [key in keyof Partial<DpsTargetStats>]: DpsTargetStats[key];
}) => {
    return {
        ...defaultPlayerDpsStats,
        ...overrides,
    };
};
