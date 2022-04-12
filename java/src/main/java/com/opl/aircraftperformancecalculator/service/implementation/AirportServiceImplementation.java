package com.opl.aircraftperformancecalculator.service.implementation;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.*;
import com.opl.aircraftperformancecalculator.models.Response;
import com.opl.aircraftperformancecalculator.models.RunwayConditions;
import com.opl.aircraftperformancecalculator.service.AirportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.transaction.Transactional;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.InvalidObjectException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.FORBIDDEN;

/**
 * Service to get airport/runway info
 */
@Service
@Transactional
@Slf4j
public class AirportServiceImplementation implements AirportService {

    /**
     * This function parses aviation weather for the specified runway and returns conditions.
     * @param airportID
     * @param runwayNumber
     * @param runwaySide
     * @return
     * @throws IOException
     * @throws ParserConfigurationException
     * @throws SAXException
     */
    @Override
    public RunwayConditions getRunwayConditions(String airportID, String runwayNumber, String runwaySide) throws IOException, ParserConfigurationException, SAXException {


        URL url = new URL("https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource" +
                "=metars&requestType=retrieve&format=xml&stationString=" + airportID +"&hoursBeforeNow=1");

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document doc = db.parse(url.openStream());
        Node root = doc.getDocumentElement();
        Node data = null;

        for(int i = 0; i < root.getChildNodes().getLength(); i++) {
            if(root.getChildNodes().item(i).getNodeName().equals("data")) {
                data = root.getChildNodes().item(i);
                break;
            }
        }

        assert data != null;
        Node metar = data.getChildNodes().item(1);

        if(metar == null) {
            RunwayConditions runwayConditions = new RunwayConditions();
            runwayConditions.setAirportID("BadMetar");
            return runwayConditions;
        }

        double temp = 0;
        double hg = 0;
        double elevation = 0;
        double headWind;
        double windDeg = 0;
        double windSpeed = 0;
        double precipitation = 0;

        NodeList metarChildren = metar.getChildNodes();
        for(int i = 0; i < metar.getChildNodes().getLength(); i++) {
            if(metarChildren.item(i).getNodeName().equals("temp_c")) {
                temp = Double.parseDouble(metarChildren.item(i).getChildNodes().item(0).getNodeValue());
            }
            if(metarChildren.item(i).getNodeName().equals("elevation_m")) {
                elevation = Double.parseDouble(metarChildren.item(i).getChildNodes().item(0).getNodeValue());
                log.info(String.valueOf(elevation));
            }
            if(metarChildren.item(i).getNodeName().equals("altim_in_hg")) {
                hg = Double.parseDouble(metarChildren.item(i).getChildNodes().item(0).getNodeValue());
            }
            if(metarChildren.item(i).getNodeName().equals("precip_in")) {
                precipitation = Double.parseDouble(metarChildren.item(i).getChildNodes().item(0).getNodeValue());
            }
            if(metarChildren.item(i).getNodeName().equals("wind_dir_degrees")) {
                windDeg = Double.parseDouble(metarChildren.item(i).getChildNodes().item(0).getNodeValue());
            }
            if(metarChildren.item(i).getNodeName().equals("wind_speed_kt")) {
                windSpeed = Double.parseDouble(metarChildren.item(i).getChildNodes().item(0).getNodeValue());
            }
        }

        double totalDeg = Math.abs(Integer.parseInt(runwaySide.replaceAll("[a-zA-Z]",""))*10+180-windDeg);

        headWind = windSpeed * 0.514444 * Math.cos(0.0174533 * totalDeg);
        List<String> list = getRunwayInfo(airportID, runwayNumber, runwaySide);

        return new RunwayConditions(airportID, temp, calculatePressureAltitude(hg, elevation), precipitation*2.54,
                headWind,Double.parseDouble(list.get(0))*0.3048, list.get(1), Double.parseDouble(list.get(2)));
    }

    /**
     * Gets runway info by parsing faa website
     * @param airportID
     * @param runwayNumber
     * @param runwaySide
     * @return
     * @throws IOException
     */
    public static List<String> getRunwayInfo(String airportID, String runwayNumber, String runwaySide) throws IOException {

        WebClient client = new WebClient();
        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);
        List<String> list = new ArrayList<>();

        String length = null;
        String runwayType = null;

        try {
            String searchUrl = "https://nfdc.faa.gov/nfdcApps/services/ajv5/airportDisplay.jsp?airportId=" + airportID;
            HtmlPage page = client.getPage(searchUrl);

            HtmlElement runway = page.querySelector("div[id=runway_" + runwayNumber + "]");
            if(runway == null) {
                runwayType = "BadRunway";
            }

            assert runway != null;
            HtmlElement table = runway.getFirstByXPath("table");
            HtmlElement tbody = table.getFirstByXPath("tbody");
            NodeList trNodes = tbody.getChildNodes();

            for(int i = 0; i < trNodes.getLength(); i++) {
                if(trNodes.item(i).getChildNodes().item(0).getFirstChild().toString().equals("Dimensions")) {
                    length = trNodes.item(i).getChildNodes().item(1).getFirstChild().toString().split(" ")[0];
                }

                if(trNodes.item(i).getChildNodes().item(0).getFirstChild().toString().equals("Surface Type")) {
                    runwayType = trNodes.item(i).getChildNodes().item(1).getFirstChild().toString();
                }
            }

            list.add(length); list.add(runwayType);

            double runwayStartHeight = 0;
            double runwayEndHeight = 0;
            String temp;

            NodeList trNodesRun1 = runway.getChildNodes().item(2).getFirstChild()
                    .getChildNodes().item(1).getFirstChild().getChildNodes();

            NodeList trNodesRun2 = runway.getChildNodes().item(2).getChildNodes().item(1)
                    .getChildNodes().item(1).getFirstChild().getChildNodes();

            if(runway.getChildNodes().item(2).getFirstChild().getFirstChild().getFirstChild().toString().contains(runwaySide)) {
                for(int i = 0; i < trNodesRun1.getLength(); i++) {
                    if(trNodesRun1.item(i).getFirstChild().getFirstChild().toString().equals("TDZE")) {
                        temp = trNodesRun1.item(i).getChildNodes().item(1).getFirstChild().toString().replaceAll("[^0-9.]", "");
                        runwayStartHeight = Double.parseDouble(temp.substring(0, temp.length()-1));
                    }
                }

                for(int i = 0; i < trNodesRun2.getLength(); i++) {
                    if(trNodesRun2.item(i).getFirstChild().getFirstChild().toString().equals("TDZE")) {
                        temp = trNodesRun2.item(i).getChildNodes().item(1).getFirstChild().toString().replaceAll("[^0-9.]", "");
                        runwayEndHeight = Double.parseDouble(temp.substring(0, temp.length()-1));
                    }
                }
            }
            else {
                for(int i = 0; i < trNodesRun1.getLength(); i++) {
                    if(trNodesRun1.item(i).getFirstChild().getFirstChild().toString().equals("TDZE")) {
                        temp = trNodesRun1.item(i).getChildNodes().item(1).getFirstChild().toString().replaceAll("[^0-9.]", "");
                        runwayEndHeight = Double.parseDouble(temp.substring(0, temp.length()-1));
                    }
                }

                for(int i = 0; i < trNodesRun2.getLength(); i++) {
                    if(trNodesRun2.item(i).getFirstChild().getFirstChild().toString().equals("TDZE")) {
                        temp = trNodesRun2.item(i).getChildNodes().item(1).getFirstChild().toString().replaceAll("[^0-9.]", "");
                        runwayStartHeight = Double.parseDouble(temp.substring(0, temp.length()-1));
                    }
                }
            }

            assert length != null;
            String slope = String.valueOf(-Math.tan((runwayEndHeight-runwayStartHeight)/Double.parseDouble(length)));
            list.add(slope);


        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        return list;
    }

    /**
     * Gets the runway options from FAA website
     * @param airportID
     * @return
     * @throws IOException
     */
    @Override
    public List<String> getRunways(String airportID) throws IOException {

        WebClient client = new WebClient();
        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);
        List<String> list = new ArrayList<>();

        try {
            String searchUrl = "https://nfdc.faa.gov/nfdcApps/services/ajv5/airportDisplay.jsp?airportId=" + airportID;
            HtmlPage page = client.getPage(searchUrl);

            List<DomNode> runway = page.querySelectorAll("div[id^=runway_]");

            // Runway not listed by faa
            if(runway.isEmpty()) {
                list.add("BadRunway");
                return list;
            }

            for(DomNode x : runway) {
                list.add(x.getAttributes().getNamedItem("id").getNodeValue().substring("runway_".length()));
            }

        } catch (IndexOutOfBoundsException e) {
            e.printStackTrace();
        }

        return list;
    }

    /**
     * Calculates pressure altitude from mercury altimeter
     * @param hg
     * @param elevation
     * @return
     */
    public static Double calculatePressureAltitude(double hg, double elevation) {
        return elevation+((hg-29.92)*1000)*0.3048;
    }
}
