import { Profile } from "./profile.model";

export class Attachment {
    
    public id: string;
    public username: string;
    public name: string;
    public mass: number;

    constructor(name: string, username: string, mass: number) {
        this.id = username + "_" + name;
        this.name = name;
        this.username = username;
        this.mass = mass;
    }
}