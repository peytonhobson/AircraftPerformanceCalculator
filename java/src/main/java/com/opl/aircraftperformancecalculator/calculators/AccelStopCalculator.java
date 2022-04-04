package com.opl.aircraftperformancecalculator.calculators;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Slf4j
public class AccelStopCalculator {

    /**
     * Calculates the accel-stop distance using cubic polynomials from digitized graph.
     * @param mass
     * @param runwayType
     * @param friction
     * @return
     * @throws FileNotFoundException
     */
    public static Double getAccelStop(double mass, String runwayType, double friction) throws FileNotFoundException {

        List<List<Double>> lineList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        /*
        Loop that creates a list of lists, where each inner list contains a polynomial (ex: list.get(0) contains the
        coefficient for the cubic variable.
        */
        Scanner sc = new Scanner(new File("src/main/resources/python/Accel-Stop_Output/accel-stop.csv"));
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

        double dist;

        if (runwayType.equalsIgnoreCase("conc") || runwayType.equalsIgnoreCase("asph")) {
            dist = lineList.get(0).get(0) * Math.pow(mass, 3) + lineList.get(0).get(1) * Math.pow(mass, 2) +
                    lineList.get(0).get(2) * mass + lineList.get(0).get(3);
        }
        else {
            dist = lineList.get(1).get(0)*Math.pow(mass,3) + lineList.get(1).get(1)*Math.pow(mass,2) +
                    lineList.get(1).get(2)*mass + lineList.get(1).get(3);
        }

        // Multiply distance by 17% if runway is wet (friction <= 0.2)
        return friction <= 0.2 ? dist*1.17*3.28084 : dist*3.28084;


    }
}
