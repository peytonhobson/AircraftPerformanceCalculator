package com.opl.java.com.opl.aircraftperformancecalculator.calculators;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TakeoffAirspeedCalculator {

    public static String getTakeoffAirspeed(String mass1) throws FileNotFoundException {

        double mass = Double.parseDouble(mass1);

        List<List<Double>> lineList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        Scanner sc = new Scanner(new File("src/main/resources/python/Takeoff_Airspeed_Output/takeoffairspeed.csv"));
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

        return "Speed over obstacle: " + (lineList.get(2).get(0)*mass + lineList.get(2).get(1)) + "<br/>" +
            "Takeoff Speed: " + (lineList.get(1).get(0)*mass + lineList.get(1).get(1)) + "<br/>" +
            "Stall Speed: " + lineList.get(0).get(0)*mass + lineList.get(0).get(1) + "<br/>";
    }
}
