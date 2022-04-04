package com.opl.aircraftperformancecalculator.calculators;

import com.opl.aircraftperformancecalculator.models.CalculatorInput;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.models.RunwayConditions;
import com.opl.aircraftperformancecalculator.models.SolverOutput;
import lombok.extern.slf4j.Slf4j;

import java.io.FileNotFoundException;
import java.util.List;

@Slf4j
public class Solver {

    public static SolverOutput solve(CalculatorInput input, double emptyAircraftKG, double agilePodKG) throws FileNotFoundException {

        Profile profile = input.getProfile();
        RunwayConditions runwayConditions = input.getRunwayConditions();
        double takeoffMass = OverallCalculator.getTakeoffMass(profile, emptyAircraftKG, agilePodKG, input.getPilot1(),
                input.getPilot2(), input.getBaggage1(), input.getBaggage2());
        double runwayLength = runwayConditions.getRunwayLength()*3.28084;
        String runwayType = runwayConditions.getRunwayType();
        double brakingFriction = OverallCalculator.getFriction(takeoffMass, runwayType).get(1);

        double totalDist;
        boolean error = false;
        boolean prevLower = false;
        boolean notFirstLoop = false;


        //TODO: need to make final adjustments to tanks after going from low to high or vice versa
        while(true) {

            totalDist = TakeoffDistanceCalculator.getTakeoffDistance(OverallCalculator.getTakeoffMass(profile, emptyAircraftKG, agilePodKG, input.getPilot1(),
                    input.getPilot2(), input.getBaggage1(), input.getBaggage2()), runwayConditions.getRunwayType()) +
                        AccelStopCalculator.getAccelStop(OverallCalculator.getTakeoffMass(profile, emptyAircraftKG, agilePodKG, input.getPilot1(),
                                input.getPilot2(), input.getBaggage1(), input.getBaggage2()), runwayType, brakingFriction);

            if(totalDist < runwayLength) {

                if(!Boolean.TRUE.equals(prevLower) && notFirstLoop) {
                    break;
                }

                if(profile.getInternalTank() < 288) {
                    profile.setInternalTank(profile.getInternalTank()+1);
                }
                else if(profile.getTipTank() < 52) {
                    profile.setTipTank(profile.getTipTank()+1);
                }
                else if(profile.getUnderwingTank() < 80) {
                    profile.setUnderwingTank(profile.getUnderwingTank()+1);
                }
                else {
                    break;
                }
                prevLower = true;
            }
            else if(totalDist > runwayLength){

                if(Boolean.TRUE.equals(prevLower) && notFirstLoop) {

                    log.info("low to high");

                    if(profile.getUnderwingTank() > 0) {
                        profile.setUnderwingTank(profile.getUnderwingTank()-1);
                    }
                    else if(profile.getTipTank() > 0) {
                        profile.setTipTank(profile.getTipTank()-1);
                    }
                    else if(profile.getInternalTank() > 60) {
                        profile.setInternalTank(profile.getInternalTank()-1);
                    }
                    break;
                }

                if(profile.getUnderwingTank() > 0) {
                    profile.setUnderwingTank(profile.getUnderwingTank()-1);
                }
                else if(profile.getTipTank() > 0) {
                    profile.setTipTank(profile.getTipTank()-1);
                }
                else if(profile.getInternalTank() > 60) {
                    profile.setInternalTank(profile.getInternalTank()-1);
                }
                else {
                    error = true;
                    break;
                }
                prevLower = false;
            }
            else {
                break;
            }

            notFirstLoop = true;

        }

        input.setProfile(profile);
        log.info(String.valueOf(totalDist));

        return new SolverOutput(profile, error, OverallCalculator.calculate(input, emptyAircraftKG, agilePodKG));
    }
}
