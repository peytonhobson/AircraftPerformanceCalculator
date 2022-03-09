export class Attachment {
    
    public id: string;
    public name: string;
    public profile: string;
    public userID: string;
    public mass: number;

    constructor(id: string, name: string, profile: string, userID: string, mass: number) {
        this.id = id;
        this.name = name;
        this.profile = profile;
        this.userID = userID;
        this.mass = mass;
    }
}