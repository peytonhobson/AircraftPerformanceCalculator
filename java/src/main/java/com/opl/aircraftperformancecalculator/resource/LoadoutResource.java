package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.*;
import com.opl.aircraftperformancecalculator.service.implementation.LoadoutServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.opl.aircraftperformancecalculator.calculators.*;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

/**
 * Class acts as Controller for Rest API
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoadoutResource {

    private final LoadoutServiceImplementation loadoutService;

    @PostMapping(path = "/calculator")
    public ResponseEntity<Response> calculate(@RequestBody Loadout loadout) throws Exception {

        // TODO: This is only temporary. Set actual API values.
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("loadout", loadoutService.calculate(loadout)))
                        .message("Output returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping(path = "/loadouts")
    public ResponseEntity<Response> returnLoadout(@RequestBody Loadout loadout) throws Exception {

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("loadout", loadoutService.list(5)))
                        .message("Loadouts retrieved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
