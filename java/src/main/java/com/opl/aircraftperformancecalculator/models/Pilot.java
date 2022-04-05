package com.opl.aircraftperformancecalculator.models;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Class to represent saved pilot info.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pilot {

    /**
     * This is returned as combination of username_name by front end.
     */
    @Id
    private String id;

    private String username;
    private String name;
    private double mass;
}
