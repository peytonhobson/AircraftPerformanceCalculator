package com.opl.aircraftperformancecalculator.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Class to reprsent profile of aircraft.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    /**
     * This is returned as combination of username_name by front end.
     */
    @Id
    private String id;

    private String username;
    private String name;
    private double internalTank;
    private double underwingTank;
    private double tipTank;
    private double Outboard;
    private boolean agilePod;
    private double agileWeight;
}