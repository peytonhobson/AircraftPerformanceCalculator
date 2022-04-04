package com.opl.aircraftperformancecalculator.models;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pilot {

    @Id
    private String id;

    private String username;
    private String name;
    private double mass;
}
