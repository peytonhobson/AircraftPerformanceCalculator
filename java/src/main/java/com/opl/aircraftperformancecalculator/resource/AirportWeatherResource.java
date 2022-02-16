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

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
@Slf4j
public class AirportWeatherResource {

    private final AirportService airportService;

    @PostMapping(path = "/{airportID}")
    public ResponseEntity<Response> register(@PathVariable("airportID") String airportID) throws Exception {

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("airportWeather", airportService.getWeatherCSV(airportID)))
                        .message("Airport Weather returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
