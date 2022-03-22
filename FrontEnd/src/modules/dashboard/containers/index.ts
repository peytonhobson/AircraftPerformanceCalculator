import { DashboardComponent } from './dashboard/dashboard.component';
import { CalculatorComponent} from './calculator/calculator.component'
import { SolverComponent } from './solver/solver.component';
import { AddProfilesComponent } from './add-profiles/add-profiles.component';
import { QueryAirportComponent } from './query-airport/query-airport.component';
import { AdminComponent } from './admin/admin.component';

export const containers = [DashboardComponent, CalculatorComponent, SolverComponent, 
    AddProfilesComponent, QueryAirportComponent, AdminComponent];

export * from './dashboard/dashboard.component';
export * from './calculator/calculator.component';
export * from './solver/solver.component';
export * from './add-profiles/add-profiles.component'
export * from './query-airport/query-airport.component';
export * from './admin/admin.component';
