import { DashboardComponent } from './dashboard/dashboard.component';
import { LightComponent } from './light/light.component';
import { StaticComponent } from './static/static.component';
import { CalculatorComponent} from './calculator/calculator.component'
import { SolverComponent } from './solver/solver.component';

export const containers = [DashboardComponent, StaticComponent, LightComponent, CalculatorComponent, SolverComponent];

export * from './dashboard/dashboard.component';
export * from './static/static.component';
export * from './light/light.component';
export * from './calculator/calculator.component'
export * from './solver/solver.component'
