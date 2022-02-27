package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.AuthUser;
import com.opl.aircraftperformancecalculator.models.AuthenticationCode;
import com.opl.aircraftperformancecalculator.models.Response;
import com.opl.aircraftperformancecalculator.models.User;
import com.opl.aircraftperformancecalculator.service.AirportService;
import com.opl.aircraftperformancecalculator.service.AuthenticationService;
import com.opl.aircraftperformancecalculator.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/airport")
@RequiredArgsConstructor
@Slf4j
public class AirportResource {

    private final AirportService airportService;


    @GetMapping(path = "/runway/{airportID}/{runwayNumber}/{runwaySide}")
    public ResponseEntity<Response> getRunwayConditions(@PathVariable final String airportID, @PathVariable final String runwayNumber, @PathVariable final String runwaySide) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("airportWeather", airportService.getWeatherXML(airportID, runwayNumber, runwaySide)))
                        .message("Airport Runways Returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping(path = "/runways/{airportID}")
    public ResponseEntity<Response> getRunwayConditions(@PathVariable final String airportID) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("airportRunways", airportService.getRunways(airportID)))
                        .message("Airport Weather returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
//    @PostMapping(path = "/runway/{airportID}")
//    public ResponseEntity<Response> getRunway(@PathVariable("airportID") String airportID,) throws Exception {
//        return ResponseEntity.ok(
//                Response.builder()
//                        .timeStamp(now())
//                        .data(of("airportRunway", airportService.getRunwayInfo(airportID, runwayNumber)))
//                        .message("Airport Weather returned")
//                        .status(OK)
//                        .statusCode(OK.value())
//                        .build()
//        );
//    }
}
