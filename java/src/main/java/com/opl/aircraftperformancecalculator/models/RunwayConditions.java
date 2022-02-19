package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RunwayConditions {

    @Id
    private String airportID;

    private Double temp;
    private Double pressureAltitude;
    private Double headWind;
    private Double precipitation;
    private Double runwayLength;
    private String runwayType;
}
