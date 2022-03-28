import { Attachment } from "./attachment";
import { Profile } from "./profile.model";
import { RunwayConditions } from "./runway-conditions";

export class CalculatorInput {
    
    public profile: Profile;
    public landingMass: number;
    public runwayConditions: RunwayConditions;
    public attachments: Attachment[];

    constructor(profile: Profile, landingMass: number, runwayConditions: RunwayConditions, attachments: Attachment[]) {
        this.profile = profile;
        this.landingMass = landingMass;
        this.runwayConditions = runwayConditions;
        this.attachments = attachments;
    }
}