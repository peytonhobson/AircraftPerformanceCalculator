package com.opl.aircraftperformancecalculator.controllers;

import com.opl.aircraftperformancecalculator.models.Loadout;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.opl.aircraftperformancecalculator.calculators.*;

/**
 * Class acts as Controller for Rest API
 */
@RestController
@RequestMapping("/api")
public class InputController {

    /**
     * Takes post request, mapped to '/inputData', performs classification
     * and returns response entity containing response with new output.
     *
     * @param input
     * @return
     * @throws Exception
     */
    @PostMapping(path = "/calculator")
    public ResponseEntity<Loadout> calculate(@RequestBody Loadout input) throws Exception {

        // TODO: This is only temporary. Set actual API values.
        input.setOutput(OverallCalculator.getData(input));
        return new ResponseEntity<>(input, HttpStatus.OK);
    }

    /**
     * Takes post request, mapped to '/inputData', performs classification
     * and returns response entity containing response with new output.
     *
     * @param input
     * @return
     * @throws Exception
     */
    @GetMapping(path = "/loadout")
    public ResponseEntity<Loadout> returnLoadout(@RequestBody Loadout input) throws Exception {

        // TODO: This is only temporary. Set actual API values.
        input.setOutput(OverallCalculator.getData(input));
        return new ResponseEntity<>(input, HttpStatus.OK);
    }
}
