package com.opl.aircraftperformancecalculator.calculators;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TakeoffAirspeedCalculator {

    public static void main(String[] args) throws FileNotFoundException {

        // This part just takes user input from the console
        Scanner in = new Scanner(System.in);

        System.out.println("mass: ");
        double mass = Double.parseDouble(in.next());

        // This list stores lists for each files.
        // Each list within it contains a list for each row of a file.
        // The final list contains each coefficient
        List<List<Double>> lineList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        int fileCount = -1;

        // This loop iterates through the array of files and puts all the values
        // in polyList as described above
        Scanner sc = new Scanner(new File("./python/Takeoff_Airspeed_Output/takeoffairspeed.csv"));
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

        getAirspeed(mass, lineList);

    }

    public static void getAirspeed(double mass, List<List<Double>> lineList) {
        //Output is in km/h
        System.out.print("Speed over obstacle: ");
        System.out.println(lineList.get(2).get(0)*mass + lineList.get(2).get(1));

        System.out.print("Takeoff Speed: ");
        System.out.println(lineList.get(1).get(0)*mass + lineList.get(1).get(1));

        System.out.print("Stall Speed: ");
        System.out.println(lineList.get(0).get(0)*mass + lineList.get(0).get(1));

    }
}
