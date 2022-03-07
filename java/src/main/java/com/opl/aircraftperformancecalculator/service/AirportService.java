package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.RunwayConditions;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

public interface AirportService {

    RunwayConditions getRunwayConditions(String airportID, String runwayNumber, String runwaySide) throws IOException, ParserConfigurationException, SAXException;
    List<String> getRunways(String airportID) throws IOException;
}
