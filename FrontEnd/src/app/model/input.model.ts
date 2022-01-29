/**
 * Class used to represent response, where output is initialized to empty
 */
 export class Input{
    public takeoffMass: string;
    public landingMass: string;
    public temp: string;
    public drag: string;
    public slope: string;
    public friction: string;
    public runwayType: string;
    public psi: string;
    public wind: string;
    public aircraftType: string;
    public output: string;

    constructor(takeoffMass: string, landingMass: string, temp: string, drag: string, slope: string, friction: string, runwayType: string, psi: string, wind: string, 
        aircraftType: string){
        this.takeoffMass = takeoffMass;
        this.landingMass = landingMass;
        this.temp = temp;
        this.drag = drag;
        this.slope = slope;
        this.friction = friction;
        this.runwayType = runwayType;
        this.psi = psi;
        this.wind = wind;
        this.aircraftType = aircraftType;
        this.output = "";
    }
}