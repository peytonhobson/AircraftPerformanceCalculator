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

    /**
     * Function to solve for maximum fuel for runway conditions and profile
     * @param input
     * @param emptyAircraftKG
     * @param agilePodKG
     * @return
     * @throws FileNotFoundException
     */
    public static SolverOutput solve(CalculatorInput input, double emptyAircraftKG, double agilePodKG) throws FileNotFoundException {

        input.setProfile(solveTakeoff(input, emptyAircraftKG, agilePodKG));

        boolean error = input.getProfile().getInternalTank() > 288;

        double galLost = solveLandingGallons(input, emptyAircraftKG, agilePodKG);

        return new SolverOutput(input.getProfile(), error, OverallCalculator.calculate(input, emptyAircraftKG, agilePodKG), galLost);
    }

    public static Profile solveTakeoff(CalculatorInput input, double emptyAircraftKG, double agilePodKG) throws FileNotFoundException {

        Profile profile = input.getProfile();
        RunwayConditions runwayConditions = input.getRunwayConditions();
        double takeoffMass = OverallCalculator.getTakeoffMass(profile, emptyAircraftKG, agilePodKG, input.getPilot1(),
                input.getPilot2(), input.getBaggage1(), input.getBaggage2());
        double runwayLength = runwayConditions.getRunwayLength()*3.28084;
        String runwayType = runwayConditions.getRunwayType();
        double brakingFriction = OverallCalculator.getFriction(runwayConditions.getPrecipitation(), runwayType).get(1);

        double totalDist;
        boolean prevLower = false;
        boolean notFirstLoop = false;


        // Loop that incrementally adds or subtracts fuel. Once combined distance of accel-stop and takeoff distance
        // either go lower or higher than the runway distance, the loop stops and the current fuel store is returned.
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
                    profile.setInternalTank(1000);
                    break;
                }
                prevLower = false;
            }
            else {
                break;
            }

            notFirstLoop = true;

        }

        return profile;
    }

    public static double solveLandingGallons(CalculatorInput input, double emptyAircraftKG, double agilePodKG) throws FileNotFoundException {

        input.setLandingMass(OverallCalculator.getTakeoffMass(input.getProfile(), emptyAircraftKG, agilePodKG, input.getPilot1(),
                input.getPilot2(), input.getBaggage1(), input.getBaggage2()));
        double runwayLength = input.getRunwayConditions().getRunwayLength()*3.28084;
        double brakingFriction = OverallCalculator.getFriction(input.getRunwayConditions().getPrecipitation(),
                input.getRunwayConditions().getRunwayType()).get(1);
        double landingDist;
        int galLost = 0;

        while(true) {

            landingDist = LandingDistanceCalculator.getLandingDistance(input.getLandingMass(),
                    brakingFriction);

            if(landingDist <= runwayLength) {
                break;
            }

            galLost++;
            input.setLandingMass(input.getLandingMass()-6.815*0.453592);
        }

        return galLost;
    }
}
