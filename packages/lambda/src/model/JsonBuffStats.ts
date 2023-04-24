export type BuffUptime = {
    id: number;
    buffData: BuffUptimeStats[]; //buffData is technically an array  but only contains a single element
    states: [];
};
export type BuffGeneration = {
    id: number;
    buffData: BuffGenerationStats[]; //buffData is technically an array  but only contains a single element
    states: any[];
};

export type BuffUptimeStats = {
    uptime: number;
    presence: number;
    generated: Record<string, number>;
    overstacked: Record<string, number>;
    wasted: Record<string, number>;
    unknownExtended: Record<string, number>;
    byExtension: Record<string, number>;
    extended: Record<string, number>;
};

export type BuffGenerationStats = {
    generation: number;
    overstack: number;
    wasted: number;
    unknownExtended: number;
    byExtension: number;
    extended: number;
};

export type StrippedDownBuffUptimeStats = {
    boon: number;
    uptime: number;
};
export type AggregatedBuffUptimeStats = {
    boon: number;
    totalUptime: number;
};

export type StrippedDownBuffGenerationStats = {
    boon: number;
    generation: number;
};
export type AggregatedBuffGenerationStats = {
    boon: number;
    totalGeneration: number;
};
