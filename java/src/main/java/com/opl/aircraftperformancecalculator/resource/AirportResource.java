package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.*;
import com.opl.aircraftperformancecalculator.service.AirportService;
import com.opl.aircraftperformancecalculator.service.AuthenticationService;
import com.opl.aircraftperformancecalculator.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/airport")
@RequiredArgsConstructor
@Slf4j
public class AirportResource {

    private final AirportService airportService;


    @GetMapping(path = "/runway/{airportID}/{runwayNumber}/{runwaySide}")
    public ResponseEntity<Response> getRunwayConditions(@PathVariable final String airportID, @PathVariable final String runwayNumber, @PathVariable final String runwaySide) throws Exception {

        RunwayConditions runwayConditions = airportService.getRunwayConditions(airportID, runwayNumber, runwaySide);

        if(runwayConditions.getAirportID().equals("BadMetar")) {
            log.info("bad metar");
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .data(of("runwayError", "Runway conditions are not available."))
                            .message("Runway Error")
                            .status(NOT_FOUND)
                            .statusCode(NOT_FOUND.value())
                            .build()
            );
        }

        if(runwayConditions.getAirportID().equals("BadRunway")) {
            log.info("bad runway");
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .data(of("runwayError", "Runway not listed by FAA."))
                            .message("Runway Error")
                            .status(NOT_FOUND)
                            .statusCode(NOT_FOUND.value())
                            .build()
            );
        }

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("runwayCondition", runwayConditions))
                        .message("Runway conditions returned.")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );

    }

    @GetMapping(path = "/runways/{airportID}")
    public ResponseEntity<Response> getRunways(@PathVariable final String airportID) throws Exception {

        List<String> list = airportService.getRunways(airportID);

        if(list.get(0).equals("BadRunway")) {
            log.info(list.toString());
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .data(of("runwayError", "Runway not listed by FAA."))
                            .message("Runway Error")
                            .status(NOT_FOUND)
                            .statusCode(NOT_FOUND.value())
                            .build()
            );
        }

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("airportRunways", list))
                        .message("Airport Weather returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
