package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorInput {

    private double takeoffMass;
    private double flightTime;
    private double pressureAltitude;
    private double headwind;
    private double temperature;
    private double slope;
    private double rollingFriction;
    private double brakingFriction;
    private String runwayType;
}
