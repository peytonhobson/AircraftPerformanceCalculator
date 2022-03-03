export class Attachment {
    public name;
    public mass;

    constructor(name: string, mass: number, ) {
        this.name = name;
        this.mass = mass;
    }

    toString() {
        return this.name + " Mass: " + this.mass + " lbs"
    }
}