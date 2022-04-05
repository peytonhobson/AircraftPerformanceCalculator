package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.AUTO;

/**
 * Authentication entity for registering users.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationCode {

    @Id
    private String code;
}
