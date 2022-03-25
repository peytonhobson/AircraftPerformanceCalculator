export class CalculatorInput {
    
    public takeoffMass: number;
    public landingWeight: number;
    public pressureAltitude: number;
    public headwind: number;
    public temperature: number;
    public slope: number;
    public rollingFriction: number;
    public brakingFriction: number;
    public runwayType: string;

    constructor(takeoffMass: number, landingWeight: number, pressureAltitude: number, headwind: number, temperature: number, slope: number, rollingFriction: number, 
        brakingFriction: number, runwayType: string) {
        this.takeoffMass = takeoffMass;
        this.landingWeight = landingWeight;
        this.pressureAltitude = pressureAltitude;
        this.headwind = headwind;
        this.temperature = temperature;
        this.slope = slope;
        this.rollingFriction = rollingFriction;
        this.brakingFriction = brakingFriction;
        this.runwayType = runwayType;
    }
}