import { Attachment } from "./attachment";
import { CalculatorOutput } from "./calculator-output";
import { Pilot } from "./pilot";
import { Profile } from "./profile.model";
import { RunwayConditions } from "./runway-conditions";
import { User } from "./user";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {profiles?: Profile[], profile?: Profile, runwayCondition? : RunwayConditions, airportRunways? : string[], 
        runwayError?: string, attachments?: Attachment[], pilots: Pilot[], pilot: Pilot, calculatorOutput: CalculatorOutput,
    user: User};
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