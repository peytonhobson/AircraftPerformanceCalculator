package com.opl.aircraftperformancecalculator.calculators;

import com.opl.aircraftperformancecalculator.models.CalculatorInput;
import com.opl.aircraftperformancecalculator.models.CalculatorOutput;
import com.opl.aircraftperformancecalculator.models.Profile;

import java.io.FileNotFoundException;
import java.util.List;

public class OverallCalculator {

    public static CalculatorOutput calculate(CalculatorInput input) throws FileNotFoundException {

        double takeoffMass = input.getTakeoffMass();
        double flightTime = input.getFlightTime();
        double pressureAltitude = input.getPressureAltitude();
        double temp = input.getTemperature();
        double rollingFriction = input.getRollingFriction();
        double brakingFriction = input.getBrakingFriction();
        double headwind = input.getHeadwind();
        double slope = input.getSlope();
        String runwayType = input.getRunwayType();
        double landingMass = getLandingMass(takeoffMass, flightTime, pressureAltitude);

        List<Double> takeoffSpeedList = TakeoffAirspeedCalculator.getTakeoffAirspeed(takeoffMass);
        List<Double> landingSpeedList = LandingAirspeedCalculator.getLandingAirspeed(landingMass);
        double groundRunDistance = GroundRunCalculator.getGroundRun(pressureAltitude, temp, takeoffMass,
                headwind, slope, rollingFriction);
        double takeoffDistance = TakeoffDistanceCalculator.getTakeoffDistance(takeoffMass, runwayType);
        double accelStopDistance = AccelStopCalculator.getAccelStop(takeoffMass, runwayType, brakingFriction);
        double landingDistance = LandingDistanceCalculator.getLandingDistance(takeoffMass, brakingFriction);

        return new CalculatorOutput(groundRunDistance, takeoffSpeedList.get(1), takeoffDistance,
                accelStopDistance, takeoffSpeedList.get(0), takeoffSpeedList.get(2), landingDistance,
                landingSpeedList.get(0), landingSpeedList.get(1), landingSpeedList.get(2), landingSpeedList.get(3));
    }

    public static double getLandingMass(double takeoffMass, double flightTime, double pressureAltitude) {

        double fuelLoss;

        if(pressureAltitude <= 2000) {
            fuelLoss = 385 - (2000-pressureAltitude)/(2000)*25;
        }
        else if(pressureAltitude > 2000 && pressureAltitude <= 4000) {
            fuelLoss = 360 - (4000-pressureAltitude)/(2000)*20;
        }
        else if(pressureAltitude > 4000 && pressureAltitude <= 6000) {
            fuelLoss = 340 - (6000-pressureAltitude)/(2000)*10;
        }
        else {
            fuelLoss = 330;
        }

        return takeoffMass - (flightTime/60)*fuelLoss;
    }
}
