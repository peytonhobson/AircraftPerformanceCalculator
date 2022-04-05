package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Output of solver to front end.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolverOutput {

    private Profile profile;
    private boolean error; // Returned if plane is too heavy for runway.
    private CalculatorOutput calculatorOutput;
}
