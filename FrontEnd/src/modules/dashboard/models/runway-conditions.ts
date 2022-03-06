export class RunwayConditions {
    public airportID: string
    public temp: number;
    public pressureAltitude: number;
    public precipitation: string;
    public headWind: string;
    public runwayLength: number;
    public runwayType: string;
    public slope: string;

    constructor(airportID: string,temp: number, pressureAltitude: number, precipitation: string, headWind: string, runwayLength: number, runwayType: string, slope: string) {
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