import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class BasicCalculator {

    public static void main(String[] args) throws FileNotFoundException {

        String[] files = {"temp", "mass", "drag", "wind", "slopes", "friction"};
        List<List<List<Double>>> polyList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();
        int fileCount = -1;

        for(String file : files) {
            polyList.add(new ArrayList<>());
            Scanner sc = new Scanner(new File("./python/output/" + file + ".csv"));
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

//        TODO: Make psi so it cant be 0 or higher than 2000?
        double psi = 900;
        int graph = 0;
        double min = Integer.MAX_VALUE;
        List<List<Double>> tempLists = polyList.get(0);
        boolean higher = true;
        double ratio = 0;

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

        double temp = 20;
        double tempOutput;
        double actualGraph = tempLists.get(graph).get(0) * (Math.pow(temp, 3)) + tempLists.get(graph).get(1) * (Math.pow(temp, 2))
                + tempLists.get(graph).get(2) * temp + tempLists.get(graph).get(3);

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

        double mass = 4300;
        List<List<Double>> massLists = polyList.get(1);
        double curY;
        List<Double> curList;
        double yDifference = 0;
        min = Integer.MAX_VALUE;

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

        double drag = 0.015;
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


        double wind = 3;
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

        double slope = 1;
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

        double friction = 0.1;
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
