import { Attachment } from "./attachment";

/**
 * Class used to represent response, where output is initialized to empty
 */
 export class Profile {
    
    public username : string;
    public name: string;
    public attachments: Attachment[]

    constructor(username: string, name: string, attachments: Attachment[]) {
        this.username = username;
        this.name = name;
        this.attachments = attachments;
    }
}
