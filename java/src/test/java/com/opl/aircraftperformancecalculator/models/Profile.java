package com.opl.java.com.opl.aircraftperformancecalculator.models;

import lombok.*;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    private String id;

    private String userID;
    private String profileName;
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

}