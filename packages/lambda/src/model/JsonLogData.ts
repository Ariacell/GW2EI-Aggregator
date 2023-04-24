import { JsonPlayer } from './JsonPlayer';

export type JsonLogData = {
    timeStart: string;
    recordedBy: string;
    players: JsonPlayer[];
};
