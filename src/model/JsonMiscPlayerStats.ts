export type JsonMiscPlayerStats = {
    wasted: number;
    timeWasted: number;
    saved: number;
    timeSaved: number;
    stackDist: number;
    distToCom: number;
    avgBoons: number;
    avgActiveBoons: number;
    avgConditions: number;
    avgActiveConditions: number;
    swapCount: number;
    totalDamageCount: number;
    directDamageCount: number;
    connectedDirectDamageCount: number;
    connectedDamageCount: number;
    downContribution: number;
    critableDirectDamageCount: number;
    criticalRate: number;
    criticalDmg: number;
    flankingRate: number;
    againstMovingRate: number;
    glanceRate: number;
    missed: number;
    evaded: number;
    blocked: number;
    interrupts: number;
    invulned: number;
    killed: number;
    downed: number;
};

export const defaultJsonMiscPlayerStats: JsonMiscPlayerStats = {
    wasted: 0,
    timeWasted: 0,
    saved: 0,
    timeSaved: 0,
    stackDist: 0,
    distToCom: 0,
    avgBoons: 0,
    avgActiveBoons: 0,
    avgConditions: 0,
    avgActiveConditions: 0,
    swapCount: 0,
    totalDamageCount: 0,
    directDamageCount: 0,
    connectedDirectDamageCount: 0,
    connectedDamageCount: 0,
    downContribution: 0,
    critableDirectDamageCount: 0,
    criticalRate: 0,
    criticalDmg: 0,
    flankingRate: 0,
    againstMovingRate: 0,
    glanceRate: 0,
    missed: 0,
    evaded: 0,
    blocked: 0,
    interrupts: 0,
    invulned: 0,
    killed: 0,
    downed: 0,
};

export const buildPlayerMiscStats = (overrides?: {
    [key in keyof Partial<JsonMiscPlayerStats>]: JsonMiscPlayerStats[key];
}) => {
    return {
        ...defaultJsonMiscPlayerStats,
        ...overrides,
    };
};
