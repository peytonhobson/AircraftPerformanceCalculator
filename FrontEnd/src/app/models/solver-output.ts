import { CalculatorOutput } from "./calculator-output";
import { Profile } from "./profile.model";

export class SolverOutput {

    public profile: Profile;
    public error: boolean;
    public calculatorOutput: CalculatorOutput
    public galLost: number;

    constructor(profile: Profile, error: boolean, calculatorOutput: CalculatorOutput, galLost: number) {
        this.profile= profile;
        this.error = error;
        this.calculatorOutput = calculatorOutput;
        this.galLost = galLost;
    }
}