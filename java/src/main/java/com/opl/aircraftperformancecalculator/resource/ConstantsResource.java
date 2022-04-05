package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.Constants;
import com.opl.aircraftperformancecalculator.models.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

/**
 * Resource to fetch constants
 */
@RestController
@RequestMapping("/constants")
@RequiredArgsConstructor
@Slf4j
public class ConstantsResource {

    @Value("${constant.aircraftMass.emptyAircraftLBS}")
    private double emptyAircraftKG;

    @Value("${constant.aircraftMass.agilePodLBS}")
    private double agilePodKG;

    @Value("${constant.aircraftMass.agileRailLBS}")
    private double agileRailWeight;

    @Value("${constant.aircraftMass.parachuteWeightLBS}")
    private double parachuteWeight;

    @Value("${constant.ARM.basicEmptyAircraft}")
    private double basicEmptyAircraft;

    @Value("${constant.ARM.emptyAgilePod}")
    private double emptyAgilePod;

    @Value("${constant.ARM.agileRail}")
    private double agileRail;

    @Value("${constant.ARM.podPayload}")
    private double podPayload;

    @Value("${constant.ARM.pilot1}")
    private double pilot1;

    @Value("${constant.ARM.pilot2}")
    private double pilot2;

    @Value("${constant.ARM.baggage1}")
    private double baggage1;

    @Value("${constant.ARM.baggage2}")
    private double baggage2;

    @Value("${constant.ARM.tanks}")
    private double tanks;

    @Value("${constant.MAC.MACL39}")
    private double MACL39;

    @Value("${constant.MAC.MACRefDatum}")
    private double MACRefDatum;

    /**
     * Returns all list constants in config file
     * @return
     */
    @GetMapping
    public ResponseEntity<Response> getAll() {

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("constants", new Constants(emptyAircraftKG, agilePodKG, agileRailWeight, parachuteWeight, basicEmptyAircraft,
                                emptyAgilePod, agileRail, podPayload, pilot1, pilot2, baggage1, baggage2, tanks, MACL39, MACRefDatum)))
                        .message("Constants returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }


}
