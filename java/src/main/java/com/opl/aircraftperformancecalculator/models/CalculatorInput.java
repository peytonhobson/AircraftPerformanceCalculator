package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorInput {

    private Profile profile;
    private double landingMass;
    private RunwayConditions runwayConditions;
    private double pilot1;
    private double pilot2;
    private double baggage1;
    private double baggage2;
}
