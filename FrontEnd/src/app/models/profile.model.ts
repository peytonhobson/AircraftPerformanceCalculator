import { Attachment } from "./attachment";

/**
 * Class used to represent response, where output is initialized to empty
 */
export class Profile {
    
    public id: string;
    public username : string;
    public name: string;
    public internalTank: number;
    public underwingTank: number;
    public tipTank: number;
    public outboard: number;
    public agilePod: boolean;
    public agileWeight: number;

    constructor(username?: string, name?: string, internalTank?: number, dropTank?: number, 
        tipTank?: number, outboard?: number, agilePod?: boolean, agileWeight?: number) {
        this.id = username + "_" + name;
        this.username = username;
        this.name = name;
        this.internalTank = internalTank;
        this.underwingTank = dropTank;
        this.tipTank = tipTank;
        this.outboard = outboard;
        this.agilePod = agilePod;
        this.agileWeight = agileWeight;
    }
}
