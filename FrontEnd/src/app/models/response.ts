import { ActivityLog } from "@modules/dashboard/models/activity-log";
import { CalculatorOutput } from "./calculator-output";
import { Constants } from "./constants";
import { Pilot } from "./pilot";
import { Profile } from "./profile.model";
import { RunwayConditions } from "./runway-conditions";
import { SolverOutput } from "./solver-output";
import { User } from "./user";

/**
 * Interface used to receive individual responses from backend
 */
export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;

    // Uses map on backend to identify specific retrieved variables.
    data: {profiles?: Profile[], profile?: Profile, runwayCondition? : RunwayConditions, airportRunways? : string[], 
        runwayError?: string, pilots: Pilot[], pilot: Pilot, calculatorOutput: CalculatorOutput,
    user: User, users: User[], activityLogs: ActivityLog[], constants: Constants, solverOutput: SolverOutput};
}

// Response used for authentication
export interface AuthenticationResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {invalidAuthenticationCode?: boolean, usernameTaken?: boolean, authentication?: boolean};
}