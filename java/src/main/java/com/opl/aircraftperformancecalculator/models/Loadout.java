package com.opl.aircraftperformancecalculator.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Loadout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

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

    //TODO: Figure out if you can use doubles instead of parsing strings
}