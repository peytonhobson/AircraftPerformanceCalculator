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
    public pylon1: string;
    public pylon2: string;
    public pylon3: string;
    public pylon4: string;
    public agilePod: boolean;
    public agileWeight: number;

    constructor(username?: string, name?: string, internalTank?: number, dropTank?: number, tipTank?: number, pylon1?: string,
        pylon2?: string, pylon3?: string, pylon4?: string, agilePod?: boolean, agileWeight?: number) {
        this.username = username;
        this.name = name;
        this.internalTank = internalTank;
        this.dropTank = dropTank;
        this.tipTank = tipTank;
        this.pylon1 = pylon1;
        this.pylon2 = pylon2;
        this.pylon3 = pylon3;
        this.pylon4 = pylon4;
        this.agilePod = agilePod;
        this.agileWeight = agileWeight;
    }
}
