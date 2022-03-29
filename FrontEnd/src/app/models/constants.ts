export class Constants {
    
    public basicEmptyAircraftWeight: number;
    public emptyAgilePodWeight: number;
    public agileRailWeight: number;
    public basicEmptyAircraft: number;
    public emptyAgilePod: number;
    public agileRail: number;
    public podPayload: number;
    public pilot1: number;
    public pilot2: number;
    public baggage1: number;
    public baggage2: number;
    public tanks: number;
    public macl39: number;
    public macrefDatum: number;

    constructor(basicEmptyAircraftWeight: number, emptyAgilePodWeight: number, agileRailWeight, basicEmptyAircraft: number, 
        emptyAgilePod: number, agileRail: number, podPayload: number, pilot1: number, pilot2: number, 
        baggage1: number, baggage2: number, tanks: number, macl39: number, macrefDatum: number) {

        this.basicEmptyAircraftWeight = basicEmptyAircraftWeight;
        this.emptyAgilePodWeight = emptyAgilePodWeight;
        this.agileRailWeight = agileRailWeight;
        this.basicEmptyAircraft = basicEmptyAircraft;
        this.emptyAgilePod = emptyAgilePod;
        this.agileRail = agileRail;
        this.podPayload = podPayload;
        this.pilot1 = pilot1;
        this.pilot2 = pilot2;
        this.baggage1 = baggage1;
        this.baggage2 = baggage2;
        this.tanks = tanks;
        this.macl39 = macl39;
        this.macrefDatum = macrefDatum;
    }
}