package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.AirportWeather;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.net.MalformedURLException;

public interface AirportService {

    AirportWeather getWeatherCSV(String airportID) throws IOException, ParserConfigurationException, SAXException;
}
