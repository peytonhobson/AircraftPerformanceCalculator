package com.opl.aircraftperformancecalculator.calculators;

import com.opl.aircraftperformancecalculator.models.Input;

import java.io.FileNotFoundException;

public class OverallCalculator {

    public static String getData(Input input) throws FileNotFoundException {

        String takeoffMass = input.getTakeoffMass();
        String landingMass = input.getLandingMass();
        String temp = input.getTemp();
        String drag = input.getDrag();
        String slope = input.getSlope();
        String friction = input.getFriction();
        String psi = input.getPsi();
        String wind = input.getWind();
        String aircraftType = input.getAircraftType();
        String runwayType = input.getRunwayType();

        System.out.println(takeoffMass);

        return AccelStopCalculator.getAccelStop(takeoffMass, runwayType) +
                GroundRunCalculator.getGroundRun(psi, temp, takeoffMass, drag, wind, slope, friction) +
                LandingDistanceCalculator.getLandingDistance(landingMass, aircraftType,friction) +
                LandingAirspeedCalculator.getLandingirspeed(landingMass) +
                TakeoffDistanceCalculator.getTakeoffDistance(takeoffMass, runwayType) +
                TakeoffAirspeedCalculator.getTakeoffAirspeed(takeoffMass);



    }
}
