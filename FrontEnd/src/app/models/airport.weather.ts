export class AirportWeather {
    public airportID: string;
    public temp: number;
    public pressureAltitude: number;
    public headWind: number;
    public precipitation: number;

    constructor(airportID: string, temp: number, pressureAltitude: number, headWind: number, precipitation: number) {
        this.airportID = airportID;
        this.temp = temp;
        this.pressureAltitude = pressureAltitude;
        this.headWind = headWind;
        this.precipitation = precipitation;
    }
}