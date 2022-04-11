
import { AdminComponent } from './admin/admin.component';
import { CalculatorComponent} from './calculator/calculator.component'
import { ProfilesComponent } from './profiles/profiles.component';
import { QueryAirportComponent } from './query-airport/query-airport.component';
import { SolverComponent } from './solver/solver.component';
import { InstructionsComponent } from './instructions/instructions.component';

export const containers = [CalculatorComponent, SolverComponent,
    ProfilesComponent, QueryAirportComponent, AdminComponent, InstructionsComponent];

export * from './calculator/calculator.component';
export * from './solver/solver.component';
export * from './profiles/profiles.component'
export * from './query-airport/query-airport.component';
export * from './admin/admin.component';
export * from './instructions/instructions.component';
