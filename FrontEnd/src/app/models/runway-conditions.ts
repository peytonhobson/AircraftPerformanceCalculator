export class RunwayConditions {
    public airportID: string
    public temp: number;
    public pressureAltitude: number;
    public precipitation: number;
    public headWind: number;
    public runwayLength: number;
    public runwayType: string;
    public slope: number;

    constructor(airportID: string,temp: number, pressureAltitude: number, precipitation: number, headWind: number, runwayLength: number, runwayType: string, slope: number) {
        this.airportID = airportID
        this.temp = temp;
        this.pressureAltitude = pressureAltitude;
        this.precipitation = precipitation;
        this.headWind = headWind;
        this.runwayLength =  runwayLength;
        this.runwayType = runwayType;
        this.slope = slope;
    }
}