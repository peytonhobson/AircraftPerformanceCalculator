package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.calculators.OverallCalculator;
import com.opl.aircraftperformancecalculator.calculators.Solver;
import com.opl.aircraftperformancecalculator.models.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ArrayReferenceType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

/**
 * Class acts as Controller for Rest API
 */
@RestController
@RequestMapping("/calculate")
@RequiredArgsConstructor
@Slf4j
public class CalculatorResource {

    // Empty Aircraft value in KG returned from config file
    @Value("${constant.aircraftMass.emptyAircraftKG}")
    private double emptyAircraftKG;

    // Empty agile pod value in KG returned from config file (Also includes rail weight)
    @Value("${constant.aircraftMass.agilePodKG}")
    private double agilePodKG;

    /**
     * Function to return calculation of inputs
     * @param input
     * @return
     * @throws Exception
     */
    @PostMapping
    public ResponseEntity<Response> calculate(@RequestBody CalculatorInput input) throws Exception {

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

    /**
     * Function to solve inputs for maximum fuel weight
     * @param input
     * @return
     * @throws Exception
     */
    @PostMapping("/solver")
    public ResponseEntity<Response> solve(@RequestBody SolverInput input) throws Exception {

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

    @PostMapping("/landing")
    public ResponseEntity<Response> landing(@RequestBody SolverInput input) throws Exception {

        List<CalculatorOutput> list = new ArrayList<>();

        // Solve for 60 gals
        input.getProfile().setInternalTank(60);
        input.getProfile().setTipTank(0);
        input.getProfile().setUnderwingTank(0);
        input.setLandingMass(OverallCalculator.getTakeoffMass(input.getProfile(), emptyAircraftKG, agilePodKG,
                input.getPilot1(), input.getPilot2(), input.getBaggage1(), input.getBaggage2())*2.20462);
        list.add(OverallCalculator.calculate(input, emptyAircraftKG, agilePodKG));

        // Solve for 150 gals
        input.getProfile().setInternalTank(150);
        input.setLandingMass(OverallCalculator.getTakeoffMass(input.getProfile(), emptyAircraftKG, agilePodKG,
                input.getPilot1(), input.getPilot2(), input.getBaggage1(), input.getBaggage2())*2.20462);
        list.add(OverallCalculator.calculate(input, emptyAircraftKG, agilePodKG));

        // Solve for 200 gals
        input.getProfile().setInternalTank(200);
        input.setLandingMass(OverallCalculator.getTakeoffMass(input.getProfile(), emptyAircraftKG, agilePodKG,
                input.getPilot1(), input.getPilot2(), input.getBaggage1(), input.getBaggage2())*2.20462);
        list.add(OverallCalculator.calculate(input, emptyAircraftKG, agilePodKG));

        // Solve for 250 gals
        input.getProfile().setInternalTank(250);
        input.setLandingMass(OverallCalculator.getTakeoffMass(input.getProfile(), emptyAircraftKG, agilePodKG,
                input.getPilot1(), input.getPilot2(), input.getBaggage1(), input.getBaggage2())*2.20462);
        list.add(OverallCalculator.calculate(input, emptyAircraftKG, agilePodKG));

        // Solve for 300 gals
        input.getProfile().setInternalTank(250);
        input.getProfile().setTipTank(50);
        input.setLandingMass(OverallCalculator.getTakeoffMass(input.getProfile(), emptyAircraftKG, agilePodKG,
                input.getPilot1(), input.getPilot2(), input.getBaggage1(), input.getBaggage2())*2.20462);
        list.add(OverallCalculator.calculate(input, emptyAircraftKG, agilePodKG));

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("calculatorOutputs", list))
                        .message("Solver Output returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
