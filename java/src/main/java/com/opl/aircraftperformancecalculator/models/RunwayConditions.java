package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Class to represent current runway conditions.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RunwayConditions {

    @Id
    private String airportID;

    private double temp;
    private double pressureAltitude;
    private double precipitation;
    private double headWind;
    private double runwayLength;
    private String runwayType; // can be concrete or grass, but represented as "CONC"/"ASPH" or "TURF"
    private double slope;
}
