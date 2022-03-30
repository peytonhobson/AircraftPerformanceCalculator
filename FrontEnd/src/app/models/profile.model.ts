import { Attachment } from "./attachment";

/**
 * Class used to represent response, where output is initialized to empty
 */
export class Profile {
    
    public username : string;
    public name: string;
    public internalTank: number;
    public dropTank: number;
    public tipTank: number;
    public outboard: number;
    public agilePod: boolean;
    public agileWeight: number;

    constructor(username?: string, name?: string, internalTank?: number, dropTank?: number, 
        tipTank?: number, outboard?: number, agilePod?: boolean, agileWeight?: number) {
        this.username = username;
        this.name = name;
        this.internalTank = internalTank;
        this.dropTank = dropTank;
        this.tipTank = tipTank;
        this.outboard = outboard;
        this.agilePod = agilePod;
        this.agileWeight = agileWeight;
    }
}
