package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.models.AirportWeather;
import com.opl.aircraftperformancecalculator.service.AirportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.transaction.Transactional;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import static javax.swing.text.html.CSS.getAttribute;


@Service
@Transactional
@Slf4j
public class AirportServiceImplementation implements AirportService {

    //TODO: Depending on performance, parse XML request with station name as param
    public AirportWeather getWeatherCSV(String airportID) throws IOException, ParserConfigurationException, SAXException {

        URL weatherUrl = new URL("https://www.aviationweather.gov/adds/dataserver_current/current/metars.cache.csv");

        URL url = new URL("https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=" +
                airportID +"&hoursBeforeNow=1" );

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document doc = db.parse(url.openStream());
        Node root = doc.getDocumentElement();
        Node data = null;
        for(int i = 0; i < root.getChildNodes().getLength(); i++) {
            if(root.getChildNodes().item(i).getNodeName().equals("data")) {
                data = root.getChildNodes().item(i);
            }
        }
        Node metar = null;
        for(int i = 0; i < data.getChildNodes().getLength(); i++) {
            System.out.println(data.getChildNodes().item(i).getNodeName());
            if(data.getChildNodes().item(i).getNodeName().equals("METAR")) {
                System.out.println("notnull");
                metar = data.getChildNodes().item(i);
                break;
            }
        }

        double temp = 0;
        double hg = 0;
        double elevation = 0;
        double headWind = 0;
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
            if(metarChildren.item(i).getNodeName().equals("wind_speed")) {
                windSpeed = Double.parseDouble(metarChildren.item(i).getChildNodes().item(0).getNodeValue());
            }
        }

        headWind = windSpeed * 0.514444 +
                           Math.cos(0.0174533 * windDeg);

        return new AirportWeather(airportID, temp, calculatePressureAltitude(hg, elevation), headWind, precipitation);
    }

    public static Double calculatePressureAltitude(double hg, double elevation) {
        return elevation+((hg-29.92)*1000)*0.3048;
    }
}
