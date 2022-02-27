package com.opl.aircraftperformancecalculator.service;

import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

public interface AirportService {

    String getWeatherXML(String airportID, String runwayNumber, String runwaySide) throws IOException, ParserConfigurationException, SAXException;
    List<String> getRunways(String airportID) throws IOException;
}
