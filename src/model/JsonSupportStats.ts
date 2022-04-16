export type SupportStats = {
    resurrects: number;
    resurrectTime: number;
    condiCleanse: number;
    condiCleanseTime: number;
    condiCleanseSelf: number;
    condiCleanseTimeSelf: number;
    boonStrips: number;
    boonStripsTime: number;
};

const defaultSupportStats: SupportStats = {
    resurrects: 0,
    resurrectTime: 0,
    condiCleanse: 0,
    condiCleanseTime: 0,
    condiCleanseSelf: 0,
    condiCleanseTimeSelf: 0,
    boonStrips: 0,
    boonStripsTime: 0,
};

export const buildSupportStats = (overrides?: { [key in keyof Partial<SupportStats>]: SupportStats[key] }) => {
    return {
        ...defaultSupportStats,
        ...overrides,
    };
};
