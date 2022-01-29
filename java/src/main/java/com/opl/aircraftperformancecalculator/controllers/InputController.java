package com.opl.aircraftperformancecalculator.controllers;

import com.opl.aircraftperformancecalculator.models.Input;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    @PostMapping(path = "/inputData")
    public ResponseEntity<Input> classify(@RequestBody Input input) throws Exception {

        // TODO: This is only temporary. Set actual API values.
        input.setOutput(OverallCalculator.getData(input));
        return new ResponseEntity<>(input, HttpStatus.OK);
    }
}
