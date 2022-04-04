package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Class to represent all constants saved in config file
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Constants {

    private double basicEmptyAircraftWeight;
    private double emptyAgilePodWeight;
    private double agileRailWeight;
    private double parachuteWeight;
    private double basicEmptyAircraft;
    private double emptyAgilePod;
    private double agileRail;
    private double podPayload;
    private double pilot1;
    private double pilot2;
    private double baggage1;
    private double baggage2;
    private double tanks;
    private double MACL39;
    private double MACRefDatum;
}
