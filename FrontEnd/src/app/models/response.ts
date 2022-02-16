import { AirportWeather } from "./airport.weather";
import { Profile } from "./profile.model";

export interface CustomResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {profiles?: Profile[], airportWeather? : AirportWeather};
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
    data: {authentication: boolean};
}

export interface WeatherResponse {
    timeStamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {airportWeather?: AirportWeather};
}