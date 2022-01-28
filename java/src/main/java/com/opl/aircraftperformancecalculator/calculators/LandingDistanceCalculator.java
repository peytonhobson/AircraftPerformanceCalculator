package com.opl.aircraftperformancecalculator.calculators;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class LandingDistanceCalculator {

    public static void main(String[] args) throws FileNotFoundException {

        // This part just takes user input from the console
        Scanner in = new Scanner(System.in);

        System.out.println("mass: ");
        double mass = Double.parseDouble(in.next());

        System.out.println("aircraft type: ");
        String aircraftType = in.next();

        System.out.println("friction coefficient (0.2 or 0.25)");
        double friction = Double.parseDouble(in.next());

        List<List<Double>> lineList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        Scanner sc = new Scanner(new File("./python/Landing_Distance_Output/landingdist.csv"));
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

        getAirspeed(mass, aircraftType, friction, lineList);

    }

    public static void getAirspeed(double mass, String aircraftType, double friction, List<List<Double>> lineList) {

        System.out.print("Landing Distance: ");

        if(aircraftType.equalsIgnoreCase("clean")) {
            if(friction == 0.25) {
                System.out.println(lineList.get(0).get(0)*mass + lineList.get(0).get(1));
            }
            else {
                System.out.println(lineList.get(1).get(0)*mass + lineList.get(1).get(1));
            }
        }
        else {
            if(friction == 0.25) {
                System.out.println(lineList.get(2).get(0)*mass + lineList.get(2).get(1));
            }
            else {
                System.out.println(lineList.get(3).get(0)*mass + lineList.get(3).get(1));
            }
        }
    }
}
