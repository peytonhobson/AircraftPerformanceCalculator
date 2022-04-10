import { Profile } from "./profile.model";
import { RunwayConditions } from "./runway-conditions";

export class CalculatorInput {
    
    public profile: Profile;
    public landingMass: number;
    public runwayConditions: RunwayConditions;
    public pilot1: number;
    public pilot2: number;
    public baggage1: number;
    public baggage2: number;

    constructor(profile: Profile, landingMass: number, runwayConditions: RunwayConditions, 
        pilot1: number, pilot2: number, baggage1: number, baggage2: number) {
        this.profile = profile;
        this.landingMass = landingMass;
        this.runwayConditions = runwayConditions;
        this.pilot1 = pilot1;
        this.pilot2 = pilot2;
        this.baggage1 = baggage1;
        this.baggage2 = baggage2
    }
}

export class SolverInput {
    
    public profile: Profile;
    public landingMass: number;
    public runwayConditions: RunwayConditions;
    public pilot1: number;
    public pilot2: number;
    public baggage1: number;
    public baggage2: number;
    public abortDistance: number;

    constructor(profile: Profile, landingMass: number, runwayConditions: RunwayConditions, pilot1: number, 
        pilot2: number, baggage1: number, baggage2: number, abortDistance: number) {
        this.profile = profile;
        this.landingMass = landingMass;
        this.runwayConditions = runwayConditions;
        this.pilot1 = pilot1;
        this.pilot2 = pilot2;
        this.baggage1 = baggage1;
        this.baggage2 = baggage2
        this.abortDistance = abortDistance;
    }
}