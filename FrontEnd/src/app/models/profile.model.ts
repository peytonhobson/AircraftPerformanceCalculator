/**
 * Class used to represent response, where output is initialized to empty
 */
 export class Profile {
    
    public id : number;
    public userID : string;
    public name: string;

    constructor(id: number, userID: string, name: string) {
        this.id = id;
        this.userID = userID;
        this.name = name;
    }
}
