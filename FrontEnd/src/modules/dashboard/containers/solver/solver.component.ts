import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'solver',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './solver.component.html',
    styleUrls: ['solver.component.scss'],
})
export class SolverComponent implements OnInit {
    constructor() {}
    title = 'FrontEnd';


    ngOnInit() {
    }
}