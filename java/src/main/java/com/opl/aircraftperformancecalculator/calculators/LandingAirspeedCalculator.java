package com.opl.aircraftperformancecalculator.calculators;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class LandingAirspeedCalculator {

    public static void main(String[] args) throws FileNotFoundException {

        Scanner in = new Scanner(System.in);

        System.out.println("mass: ");
        double mass = Double.parseDouble(in.next());

        List<List<Double>> lineList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        Scanner sc = new Scanner(new File("./python/Landing_Airspeed_Output/landingairspeed.csv"));
        sc.useDelimiter(",");   //sets the delimiter pattern
        String val = null;
        while (sc.hasNext()) {
            if (numList.size() > 3) {
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

        getAirspeed(mass, lineList);

    }

    public static void getAirspeed(double mass, List<List<Double>> lineList) {
        //Output is in km/h
        System.out.print("Approach Speed: ");
        System.out.println(lineList.get(3).get(0)*Math.pow(mass,3) + lineList.get(3).get(1)*Math.pow(mass,2) +
                lineList.get(3).get(2)*mass + lineList.get(3).get(3));

        System.out.print("Touch-Down Speed: ");
        System.out.println(lineList.get(2).get(0)*Math.pow(mass,3) + lineList.get(2).get(1)*Math.pow(mass,2) +
                lineList.get(2).get(2)*mass + lineList.get(2).get(3));

        System.out.print("Stall Speed (Gear Down): ");
        System.out.println(lineList.get(1).get(0)*Math.pow(mass,3) + lineList.get(1).get(1)*Math.pow(mass,2) +
                lineList.get(1).get(2)*mass + lineList.get(1).get(3));

        System.out.print("Stall Speed (Gear Up): ");
        System.out.println(lineList.get(0).get(0)*Math.pow(mass,3) + lineList.get(0).get(1)*Math.pow(mass,2) +
                lineList.get(0).get(2)*mass + lineList.get(0).get(3));


    }
}
