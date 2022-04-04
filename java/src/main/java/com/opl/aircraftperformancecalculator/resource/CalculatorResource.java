package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.calculators.OverallCalculator;
import com.opl.aircraftperformancecalculator.calculators.Solver;
import com.opl.aircraftperformancecalculator.models.CalculatorInput;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

/**
 * Class acts as Controller for Rest API
 */
@RestController
@RequestMapping("/calculate")
@RequiredArgsConstructor
public class CalculatorResource {

    @Value("${constant.aircraftMass.emptyAircraftKG}")
    private double emptyAircraftKG;

    @Value("${constant.aircraftMass.agilePodKG}")
    private double agilePodKG;

    @PostMapping
    public ResponseEntity<Response> calculate(@RequestBody CalculatorInput input) throws Exception {

        // TODO: This is only temporary. Set actual API values.
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("calculatorOutput", OverallCalculator.calculate(input, emptyAircraftKG, agilePodKG)))
                        .message("Calculator Output returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping("/solver")
    public ResponseEntity<Response> solve(@RequestBody CalculatorInput input) throws Exception {

        // TODO: This is only temporary. Set actual API values.
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("solverOutput", Solver.solve(input, emptyAircraftKG, agilePodKG)))
                        .message("Solver Output returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
