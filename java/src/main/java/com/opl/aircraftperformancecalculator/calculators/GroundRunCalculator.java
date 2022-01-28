package com.opl.aircraftperformancecalculator.calculators;

import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class GroundRunCalculator {

    public static void main(String[] args) throws FileNotFoundException {

        // This part just takes user input from the console
        Scanner in = new Scanner(System.in);

        System.out.println("psi: ");
        double psi=Double.parseDouble(in.next());

        System.out.println("temp: ");
        double temp=Double.parseDouble(in.next());

        System.out.println("mass: ");
        double mass=Double.parseDouble(in.next());

        System.out.println("drag: ");
        double drag=Double.parseDouble(in.next());

        System.out.println("wind: ");
        double wind=Double.parseDouble(in.next());

        System.out.println("slope: ");
        double slope=Double.parseDouble(in.next());

        System.out.println("friction: ");
        double friction=Double.parseDouble(in.next());

        // Names of the csv file names the contain the coefficients
        String[] files = {"temp", "mass", "drag", "wind", "slopes", "friction"};

        // This list stores lists for each files.
        // Each list within it contains a list for each row of a file.
        // The final list contains each coefficient
        List<List<List<Double>>> polyList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        int fileCount = -1;

        // This loop iterates through the array of files and puts all the values
        // in polyList as described above
        for(String file : files) {
            polyList.add(new ArrayList<>());
            Scanner sc = new Scanner(new File("./python/GroundRun_Output/" + file + ".csv"));
            sc.useDelimiter(",");   //sets the delimiter pattern
            fileCount++;
            String val = null;
            while (sc.hasNext())  //returns a boolean value
            {
                if(numList.size() > 3) {
                    polyList.get(fileCount).add(numList);
                    numList = new ArrayList<>();
                }

                try {
                    val = sc.next();
                    numList.add(new BigDecimal(val).doubleValue());
                }
                catch(NumberFormatException exception) {
                    assert val != null;
                    try {
                        numList.add(Double.parseDouble(val));
                    }
                    catch(NumberFormatException exception2) {

                    }
                }
            }
        }

        // graph keeps track of which equation is closest to the value
//        TODO: Make psi so it cant be 0 or higher than 2000?
        int graph = 0;
        double min = Integer.MAX_VALUE;
        List<List<Double>> tempLists = polyList.get(0);

        // Used to determine if psi is higher or lower than closest equation
        boolean higher = true;

        // Finds which equation is closest to selected psi
        for(int i = 0; i < 5; i++) {
            if(Math.abs(psi-i*500) < min) {
                min = Math.abs(psi-i*500);
                graph = i;
                if(psi-i*500 >= 0) {
                    higher = true;
                }
                else {
                    higher=false;
                }
            }
        }

        double tempOutput;

        // Finds value for psi and temperature if you followed the closest graph
        double actualGraph = tempLists.get(graph).get(0) * (Math.pow(temp, 3)) + tempLists.get(graph).get(1) * (Math.pow(temp, 2))
                + tempLists.get(graph).get(2) * temp + tempLists.get(graph).get(3);

        // This if sequence translates the graph to match psi if it isn't perfectly divisible by 500
        if(higher && graph != 4) {
            tempOutput = (tempLists.get(graph+1).get(0) * (Math.pow(temp, 3)) + tempLists.get(graph+1).get(1) * (Math.pow(temp, 2))
                    + tempLists.get(graph+1).get(2) * temp + tempLists.get(graph+1).get(3) - actualGraph)*(min/500) + actualGraph;
        }
        else if(!higher) {
           tempOutput = actualGraph - (tempLists.get(graph+1).get(0) * (Math.pow(temp, 3)) + tempLists.get(graph+1).get(1) * (Math.pow(temp, 2))
                    + tempLists.get(graph+1).get(2) * temp + tempLists.get(graph+1).get(3) - actualGraph)*(min/500);
        }
        else {
            tempOutput = actualGraph;
        }

        // massLists is the entire file for mass
        List<List<Double>> massLists = polyList.get(1);
        double curY;
        List<Double> curList;

        // Difference between actual y from temp and y output from closest equation
        double yDifference = 0;
        min = Integer.MAX_VALUE;

        // Finds closest equation by finding minimum distance, this whole process just repeats for the rest of the graphs below
        for(int i = 0; i < 7; i++) {
            curList = massLists.get(i);
            curY = curList.get(0) * (Math.pow(mass, 3)) + curList.get(1) * (Math.pow(mass, 2))
                    + curList.get(2) * mass + curList.get(3);
            if(Math.abs(curY-tempOutput) < min) {
                min = Math.abs(curY-tempOutput);
                graph = i;
                yDifference = tempOutput-curY;
            }
        }

        double massOutput= massLists.get(graph).get(0) * (Math.pow(mass, 3)) + massLists.get(graph).get(1) * (Math.pow(mass, 2))
                + massLists.get(graph).get(2) * mass + massLists.get(graph).get(3) + yDifference;

        List<List<Double>> dragLists = polyList.get(2);
        min = Integer.MAX_VALUE;

        for(int i = 0; i < 7; i++) {
            curList = dragLists.get(i);
            curY = curList.get(0) * (Math.pow(drag, 3)) + curList.get(1) * (Math.pow(drag, 2))
                    + curList.get(2) * drag + curList.get(3);
            if(Math.abs(curY-massOutput) < min) {
                min = Math.abs(curY-massOutput);
                graph = i;
                yDifference = massOutput-curY;
            }
        }

        double dragOutput = dragLists.get(graph).get(0) * (Math.pow(drag, 3)) + dragLists.get(graph).get(1) * (Math.pow(drag, 2))
                + dragLists.get(graph).get(2) * drag + dragLists.get(graph).get(3) + yDifference;


        List<List<Double>> windLists = polyList.get(3);
        min = Integer.MAX_VALUE;

        for(int i = 0; i < 7; i++) {
            curList = windLists.get(i);
            curY = curList.get(0) * (Math.pow(wind, 3)) + curList.get(1) * (Math.pow(wind, 2))
                    + curList.get(2) * wind + curList.get(3);
            if(Math.abs(curY-dragOutput) < min) {
                min = Math.abs(curY-dragOutput);
                graph = i;
                yDifference = dragOutput-curY;
            }
        }

        double windOutput = windLists.get(graph).get(0) * (Math.pow(wind, 3)) + windLists.get(graph).get(1) * (Math.pow(wind, 2))
                + windLists.get(graph).get(2) * wind + windLists.get(graph).get(3) + yDifference;

        List<List<Double>> slopeLists = polyList.get(4);
        min = Integer.MAX_VALUE;

        for(int i = 0; i < 7; i++) {
            curList = slopeLists.get(i);
            curY = curList.get(0) * (Math.pow(slope, 3)) + curList.get(1) * (Math.pow(slope, 2))
                    + curList.get(2) * slope + curList.get(3);
            if(Math.abs(curY-windOutput) < min) {
                min = Math.abs(curY-windOutput);
                graph = i;
                yDifference = windOutput-curY;
            }
        }

        double slopeOutput = slopeLists.get(graph).get(0) * (Math.pow(slope, 3)) + slopeLists.get(graph).get(1) * (Math.pow(slope, 2))
                + slopeLists.get(graph).get(2) * slope + slopeLists.get(graph).get(3) + yDifference;

        List<List<Double>> fricLists = polyList.get(5);
        min = Integer.MAX_VALUE;

        for(int i = 0; i < 7; i++) {
            curList = fricLists.get(i);
            curY = curList.get(0) * (Math.pow(friction, 3)) + curList.get(1) * (Math.pow(friction, 2))
                    + curList.get(2) * friction + curList.get(3);
            if(Math.abs(curY-slopeOutput) < min) {
                min = Math.abs(curY-slopeOutput);
                graph = i;
                yDifference = slopeOutput-curY;
            }
        }

        double fricOutput = fricLists.get(graph).get(0) * (Math.pow(friction, 3)) + fricLists.get(graph).get(1) * (Math.pow(friction, 2))
                + fricLists.get(graph).get(2) * friction + fricLists.get(graph).get(3) + yDifference;

        System.out.println(fricOutput);


    }
}
