package com.opl.aircraftperformancecalculator.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Loadout {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    private String userID;
    private String loadoutName;
    private String takeoffMass;
    private String landingMass;
    private String temp;
    private String drag;
    private String slope;
    private String friction;
    private String runwayType;
    private String psi;
    private String wind;
    private String aircraftType;
    private String output;

    public Loadout(String userID, String loadoutName, String takeoffMass,
                   String landingMass, String temp, String drag, String slope, String friction,
                   String runwayType, String psi, String wind, String aircraftType) {
        this.id = userID + "_" + loadoutName;
        this.userID = userID;
        this.loadoutName = loadoutName;
        this.takeoffMass = takeoffMass;
        this.landingMass = landingMass;
        this.temp = temp;
        this.drag = drag;
        this.slope = slope;
        this.friction = friction;
        this.runwayType = runwayType;
        this.psi = psi;
        this.wind = wind;
        this.aircraftType = aircraftType;
        this.output = output;
    }
//TODO: Figure out if you can use doubles instead of parsing strings
}