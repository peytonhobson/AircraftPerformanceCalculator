package com.opl.aircraftperformancecalculator.calculators;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Slf4j
public class TakeoffAirspeedCalculator {

    public static List<Double> getTakeoffAirspeed(double mass) throws FileNotFoundException {

        log.info("takeoffSpeed");

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

        return List.of(lineList.get(2).get(0)*mass + lineList.get(2).get(1),
            lineList.get(1).get(0)*mass + lineList.get(1).get(1),
            lineList.get(0).get(0)*mass + lineList.get(0).get(1));
    }
}
