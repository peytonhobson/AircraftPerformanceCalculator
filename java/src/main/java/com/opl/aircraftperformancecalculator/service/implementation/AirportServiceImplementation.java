package com.opl.aircraftperformancecalculator.service.implementation;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.*;
import com.opl.aircraftperformancecalculator.service.AirportService;
import lombok.extern.slf4j.Slf4j;
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
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
@Transactional
@Slf4j
public class AirportServiceImplementation implements AirportService {

    //TODO: Will likely need to make this return AirportWeather instead of string
    @Override
    public String getWeatherXML(String airportID, String runwayNumber) throws IOException, ParserConfigurationException, SAXException {


        URL url = new URL("https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource" +
                "=metars&requestType=retrieve&format=xml&stationString=" + airportID +"&hoursBeforeNow=1" );

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
        Node metar = null;
        for(int i = 0; i < Objects.requireNonNull(data).getChildNodes().getLength(); i++) {
            if(data.getChildNodes().item(i).getNodeName().equals("METAR")) {
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

        assert metar != null;
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
        List<String> list = getRunwayInfo(airportID, runwayNumber);


        return "Temperature = " + temp + " C <br/>" +
                "Pressure Altitude = " + calculatePressureAltitude(hg, elevation)+ "m <br/>" +
                "Precipitation = " + precipitation + " inches <br/>" +
                "Head Wind = " + headWind + " m/s <br/>" +
                "Runway Length = " + list.get(0) + "ft <br/> " +
                "Runway Type = " + list.get(1) + "<br/>";
    }

    public static List<String> getRunwayInfo(String airportID, String runwayNumber) throws IOException {

        WebClient client = new WebClient();
        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);
        List<String> list = new ArrayList<>();

        try {
            String searchUrl = "https://nfdc.faa.gov/nfdcApps/services/ajv5/airportDisplay.jsp?airportId=" + airportID;
            HtmlPage page = client.getPage(searchUrl);

            //TODO: Make sure that user has restrictions on how they enter runwayNumber
            HtmlElement runway = page.querySelector("div[id=runway_" + runwayNumber + "]");
            HtmlElement table = runway.getFirstByXPath("table");
            HtmlElement tbody = table.getFirstByXPath("tbody");
            HtmlElement trDim = (HtmlElement) tbody.getChildNodes().item(0);
            HtmlElement tdDim = (HtmlElement) trDim.getChildNodes().item(1);
            String[] dimensions = tbody.getChildNodes().item(0).getChildNodes().item(1).getChildNodes()
                    .item(0).getNodeValue().split(" ");
            String length = dimensions[0];
            String runwayType = tbody.getChildNodes().item(1).getChildNodes().item(1).getChildNodes()
                    .item(0).getNodeValue();
            list.add(length); list.add(runwayType);


        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        return list;
    }

    @Override
    public List<String> getRunways(String airportID) throws IOException {

        WebClient client = new WebClient();
        client.getOptions().setCssEnabled(false);
        client.getOptions().setJavaScriptEnabled(false);
        List<String> list = new ArrayList<>();

        try {
            String searchUrl = "https://nfdc.faa.gov/nfdcApps/services/ajv5/airportDisplay.jsp?airportId=" + airportID;
            HtmlPage page = client.getPage(searchUrl);

            //TODO: Make sure that user has restrictions on how they enter runwayNumber
            List<DomNode> runway = page.querySelectorAll("div[id^=runway_]");

            for(DomNode x : runway) {
                list.add(x.getAttributes().getNamedItem("id").getNodeValue().substring("runway_".length()));
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        return list;
    }

    public static Double calculatePressureAltitude(double hg, double elevation) {
        return elevation+((hg-29.92)*1000)*0.3048;
    }
}
