import java.io.File;
import java.io.FileNotFoundException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class AccelStopCalculator {

    public static void main(String[] args) throws FileNotFoundException {

        Scanner in = new Scanner(System.in);

        System.out.println("Takeoff Mass: ");
        double mass = Double.parseDouble(in.next());

        System.out.println("Runway Type: ");
        String runwayType = in.next();

        List<List<Double>> lineList = new ArrayList<>();
        List<Double> numList = new ArrayList<>();

        int fileCount = -1;

        // This loop iterates through the array of files and puts all the values
        // in polyList as described above
        Scanner sc = new Scanner(new File("./python/Accel-Stop_Output/accel-stop.csv"));
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

        getAccelStop(mass, runwayType, lineList);
    }

    public static void getAccelStop(double mass, String runwayType, List<List<Double>> lineList) {

        System.out.print("Accel-Stop Distance: ");

        if (runwayType.toLowerCase().equals("concrete")) {
            System.out.println(lineList.get(0).get(0)*Math.pow(mass,3) + lineList.get(0).get(1)*Math.pow(mass,2) +
                lineList.get(0).get(2)*mass + lineList.get(0).get(3));
        }
        else {
            System.out.println(lineList.get(1).get(0)*Math.pow(mass,3) + lineList.get(1).get(1)*Math.pow(mass,2) +
                    lineList.get(1).get(2)*mass + lineList.get(1).get(3));
        }




    }
}
