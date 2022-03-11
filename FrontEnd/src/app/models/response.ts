import { Attachment } from "./attachment";
import { Pilot } from "./pilot";
import { Profile } from "./profile.model";
import { RunwayConditions } from "./runway-conditions";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {profiles?: Profile[], runwayCondition? : RunwayConditions, airportRunways? : string[], 
        runwayError?: string, attachments?: Attachment[], pilots: Pilot[]};
}

export interface CalculatorResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {output: string};
}

export interface AuthenticationResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {invalidAuthenticationCode?: boolean, usernameTaken?: boolean, authentication?: boolean};
}