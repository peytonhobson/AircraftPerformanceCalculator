export class ActivityLog {

    public username: string;
    public time: string;
    public action: string;
    public input: string;
    public output: string;

    constructor(username: string, time: string, action: string, input: string, output: string ) {
        this.username = username;
        this.time = time;
        this.action = action;
        this.input = input;
        this.output = output;
    }
}