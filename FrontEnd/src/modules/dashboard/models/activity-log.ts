export class ActivityLog {
    public id: number;
    public time: string;
    public action: string;
    public input: string;
    public output: string;

    constructor(id: number, time: string, action: string, input: string, output: string ) {
        this.id = id;
        this.time = time;
        this.action = action;
        this.input = input;
        this.output = output;
    }
}