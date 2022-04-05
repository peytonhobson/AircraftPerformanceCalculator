package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Class to represent parameters returned by calculator to front end.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorOutput {

    private double groundRunDistance;
    private double takeoffSpeed;
    private double takeoffDistance;
    private double accelStopDistance;
    private double speedOverObstacle;
    private double stallSpeedVS1;
    private double landingDistance;
    private double approachSpeed;
    private double touchDownSpeed;
    private double stallSpeedVS0GD;
    private double stallSpeedVS0GU;
}
