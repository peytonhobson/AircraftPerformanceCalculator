package com.opl.java.com.opl.aircraftperformancecalculator.calculators;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TakeoffDistanceCalculator {

    public static String getTakeoffDistance(String mass1, String runwayType) throws FileNotFoundException {

        double mass = Double.parseDouble(mass1);

        List<List<Double>> lineList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        Scanner sc = new Scanner(new File("src/main/resources/python/Takeoff_Distance_Output/takeoffdist.csv"));
        sc.useDelimiter(",");
        String val = null;
        while (sc.hasNext()) {
            if (numList.size() > 3) {
                lineList.add(numList);
                numList = new ArrayList<>();
            }

            try {
                val = sc.next();
                numList.add(new BigDecimal(val).doubleValue());
            } catch (NumberFormatException exception) {
                assert val != null;
                try {
                    numList.add(Double.parseDouble(val));
                } catch (NumberFormatException exception2) {
                }
            }
        }

        double takeoffDist;

        if (runwayType.equalsIgnoreCase("concrete")) {
            takeoffDist = lineList.get(0).get(0)*Math.pow(mass,3) + lineList.get(0).get(1)*Math.pow(mass,2) +
                    lineList.get(0).get(2)*mass + lineList.get(0).get(3);
        }
        else {
            takeoffDist = lineList.get(1).get(0)*Math.pow(mass,3) + lineList.get(1).get(1)*Math.pow(mass,2) +
                    lineList.get(1).get(2)*mass + lineList.get(1).get(3);
        }

        return "Takeoff Distance:" + takeoffDist + "<br/>";
    }
}