package com.opl.aircraftperformancecalculator.models;

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

    //TODO: Should drag even be used?
    // Maybe make optional?
    private String drag;
    private String aircraftType;
    private String output;
}