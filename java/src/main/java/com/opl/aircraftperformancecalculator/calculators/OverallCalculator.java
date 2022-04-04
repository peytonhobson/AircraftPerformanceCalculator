package com.opl.aircraftperformancecalculator.calculators;


import com.opl.aircraftperformancecalculator.models.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
public class OverallCalculator {

    /**
     * Calls all calculator functions to calculate flight parameters.
     * @param input
     * @param emptyAircraftKG
     * @param agilePodKG
     * @return
     * @throws FileNotFoundException
     */
    public static CalculatorOutput calculate(CalculatorInput input, double emptyAircraftKG, double agilePodKG) throws FileNotFoundException {

        Profile profile = input.getProfile();
        RunwayConditions runwayConditions = input.getRunwayConditions();

        double landingMass = input.getLandingMass()*0.453592;
        double takeoffMass = OverallCalculator.getTakeoffMass(profile, emptyAircraftKG, agilePodKG, input.getPilot1(),
                input.getPilot2(), input.getBaggage1(), input.getBaggage2());
        double pressureAltitude = runwayConditions.getPressureAltitude();
        double temp = runwayConditions.getTemp();
        double headwind = runwayConditions.getHeadWind();
        double slope = runwayConditions.getSlope();

        // Parameters for calculating friction
        double precipitation = runwayConditions.getPrecipitation();
        String runwayType = runwayConditions.getRunwayType();
        List<Double> frictionList = OverallCalculator.getFriction(precipitation, runwayType);
        double rollingFriction = frictionList.get(0), brakingFriction = frictionList.get(1);


        List<Double> takeoffSpeedList = TakeoffAirspeedCalculator.getTakeoffAirspeed(takeoffMass);
        List<Double> landingSpeedList = LandingAirspeedCalculator.getLandingAirspeed(landingMass);
        double groundRunDistance = GroundRunCalculator.getGroundRun(pressureAltitude, temp, takeoffMass,
                headwind, slope, rollingFriction);
        double takeoffDistance = TakeoffDistanceCalculator.getTakeoffDistance(takeoffMass, runwayType);
        double accelStopDistance = AccelStopCalculator.getAccelStop(takeoffMass, runwayType, brakingFriction);
        double landingDistance = LandingDistanceCalculator.getLandingDistance(takeoffMass, brakingFriction);

        // Create and return new instance of a calculator output model using the calculated parameters.
        return new CalculatorOutput(groundRunDistance, takeoffSpeedList.get(1), takeoffDistance,
                accelStopDistance, takeoffSpeedList.get(0), takeoffSpeedList.get(2), landingDistance,
                landingSpeedList.get(0), landingSpeedList.get(1), landingSpeedList.get(2), landingSpeedList.get(3));
    }

    /**
     * Calculates takeoff mass by summing the weight of all the components in the aircraft. Also converts
     * LBS to KG.
     * @param profile
     * @param emptyAircraftKG
     * @param agilePodKG
     * @param pilot1
     * @param pilot2
     * @param baggage1
     * @param baggage2
     * @return
     */
    public static double getTakeoffMass(Profile profile, double emptyAircraftKG, double agilePodKG, double pilot1,
                                        double pilot2, double baggage1, double baggage2) {

        double takeoffMass = emptyAircraftKG; // Empty aircraft in kg

        if(profile.isAgilePod()) {
            takeoffMass += agilePodKG;
            takeoffMass += profile.getAgileWeight()*0.453592;
        }

        takeoffMass += profile.getInternalTank()*0.453592;
        takeoffMass += profile.getTipTank()*0.453592;
        takeoffMass += profile.getUnderwingTank()*0.453592;
        takeoffMass += profile.getOutboard()*0.453592;
        takeoffMass += pilot1*0.453592;
        takeoffMass += pilot2*0.453592;
        takeoffMass += baggage1*0.453592;
        takeoffMass += baggage2*0.453592;

        return Math.round(takeoffMass*100)/100.0;
    }

    /**
     * Calculates friction based on table in dash 1 document.
     * @param precipitation
     * @param runwayType
     * @return
     */
    public static List<Double> getFriction(double precipitation, String runwayType) {

        double rollingFriction = 0, brakingFriction = 0;

        if(precipitation > 0 && (runwayType.equals("CONC") || runwayType.equals("ASPH"))) {
            rollingFriction = 0.05;
            brakingFriction = 0.2; //TODO: May need to change based on levels of precipitation
        }
        if(precipitation == 0 && (runwayType.equals("CONC") || runwayType.equals("ASPH"))) {
            rollingFriction = 0.04;
            brakingFriction = 0.4; //TODO: May need to change based on levels of precipitation
        }
        if(precipitation > 0 && runwayType.equals("TURF")) {
            rollingFriction = 0.08;
            brakingFriction = 0.2; //TODO: May need to change based on levels of precipitation
        }
        if(precipitation == 0 && runwayType.equals("TURF")) {
            rollingFriction = 0.04;
            brakingFriction = 0.3; //TODO: May need to change based on levels of precipitation
        }

        List<Double> list = new ArrayList<>();
        list.add(rollingFriction); list.add(brakingFriction);

        return list;
    }
}
