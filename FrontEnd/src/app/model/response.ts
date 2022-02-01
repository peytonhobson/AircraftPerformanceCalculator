import {Loadout} from "./loadout.model";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {loadouts?: Loadout[], loadout?: Loadout};
}