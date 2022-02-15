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
public class AirportWeather {

    @Id
    private String airportID;

    private String temp;
    private String slope;

    //TODO: Need to figure out how to calculate this
    private String friction;
    private String runwayType;
    private String psi;
    private String wind;
}
