package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Class to represent user that is attempting to register.
 * This info is passed to create new user without code attribute.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthUser {

    String code;
    String username;
    String password;
    String role;
}
