package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolverOutput {

    private Profile profile;
    private boolean error;
    private CalculatorOutput calculatorOutput;
}
