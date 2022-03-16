export class CalculatorOutput {
    
    public groundRunDistance: number;
    public takeoffSpeed: number;
    public takeoffDistance: number;
    public accelStopDistance: number;
    public speedOverObstacle: number;
    public stallSpeedVS1: number;
    public landingDistance: number;
    public approachSpeed: number;
    public touchDownSpeed: number;
    public stallSpeedVS0GD: number;
    public stallSpeedVS0GU: number;

    constructor(groundRunDistance: number, takeoffSpeed: number, takeoffDistance: number, accelStopDistance: number, speedOverObstacle: number, stallSpeedVS1: number, landingDistance: number, approachSpeed: number, touchDownSpeed: number, stallSpeedVS0GD: number, stallSpeedVS0GU: number) {
        this.groundRunDistance = groundRunDistance;
        this.takeoffSpeed = takeoffSpeed;
        this.takeoffDistance = takeoffDistance;
        this.accelStopDistance = accelStopDistance;
        this.speedOverObstacle = speedOverObstacle;
        this.stallSpeedVS1 = stallSpeedVS1;
        this.landingDistance = landingDistance;
        this.approachSpeed = approachSpeed;
        this.touchDownSpeed = touchDownSpeed;
        this.stallSpeedVS0GD = stallSpeedVS0GD;
        this.stallSpeedVS0GU = stallSpeedVS0GU;
    }
}