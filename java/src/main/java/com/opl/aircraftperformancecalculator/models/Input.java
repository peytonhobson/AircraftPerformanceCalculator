package com.opl.aircraftperformancecalculator.models;

public class Input {

    private double takeoffMass;
    private double landingMass;
    private double temp;
    private double drag;
    private double slope;
    private double friction;

    public Input(double takeoffMass, double landingMass, double temp, double drag, double slope, double friction) {
        this.takeoffMass = takeoffMass;
        this.landingMass = landingMass;
        this.temp = temp;
        this.drag = drag;
        this.slope = slope;
        this.friction = friction;
    }

    public double getTakeoffMass() {
        return takeoffMass;
    }

    public void setTakeoffMass(double takeoffMass) {
        this.takeoffMass = takeoffMass;
    }

    public double getLandingMass() {
        return landingMass;
    }

    public void setLandingMass(double landingMass) {
        this.landingMass = landingMass;
    }

    public double getTemp() {
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }

    public double getDrag() {
        return drag;
    }

    public void setDrag(double drag) {
        this.drag = drag;
    }

    public double getSlope() {
        return slope;
    }

    public void setSlope(double slope) {
        this.slope = slope;
    }

    public double getFriction() {
        return friction;
    }

    public void setFriction(double friction) {
        this.friction = friction;
    }

    @Override
    public String toString() {
        return "Inputs{" +
                "takeoffMass=" + takeoffMass +
                ", landingMass=" + landingMass +
                ", temp=" + temp +
                ", drag=" + drag +
                ", slope=" + slope +
                ", friction=" + friction +
                '}';
    }
}