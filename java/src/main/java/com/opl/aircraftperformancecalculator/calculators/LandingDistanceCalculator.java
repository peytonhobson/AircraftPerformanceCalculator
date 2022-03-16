package com.opl.aircraftperformancecalculator.calculators;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Slf4j
public class LandingDistanceCalculator {

    public static Double getLandingDistance(double mass, double friction) throws FileNotFoundException {

        log.info("landingdist");

        List<List<Double>> lineList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        Scanner sc = new Scanner(new File("src/main/resources/python/Landing_Distance_Output/landingdist.csv"));
        sc.useDelimiter(",");   //sets the delimiter pattern
        String val = null;
        while (sc.hasNext()) {
            if (numList.size() > 1) {
                lineList.add(numList);
                numList = new ArrayList<>();
            }

            try {
                val = sc.next();
                numList.add(new BigDecimal(val).doubleValue());
            }
            catch (NumberFormatException exception) {
                assert val != null;
                try {
                    numList.add(Double.parseDouble(val));
                }
                catch (NumberFormatException exception2) {
                }
            }
        }

        double landingDist;


        if(mass < 5000) {
            landingDist = lineList.get(1).get(0)*mass + lineList.get(0).get(1);
        }
        else {
            landingDist = lineList.get(3).get(0)*mass + lineList.get(3).get(1);
        }

        return friction <= 0.2 ?  landingDist*1.17:landingDist;
    }
}
