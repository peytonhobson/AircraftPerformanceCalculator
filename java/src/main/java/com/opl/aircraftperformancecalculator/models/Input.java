package com.opl.aircraftperformancecalculator.models;

public class Input {

    private String takeoffMass;
    private String landingMass;
    private String temp;
    private String drag;
    private String slope;
    private String friction;
    private String runwayType;
    private String psi;
    private String wind;
    private String aircraftType;
    private String output;

    public Input() {
    }

    public Input(String takeoffMass, String landingMass, String temp, String drag, String slope, String friction, String runwayType,
                 String psi, String wind, String aircraftType, String output) {
        this.takeoffMass = takeoffMass;
        this.landingMass = landingMass;
        this.temp = temp;
        this.drag = drag;
        this.slope = slope;
        this.friction = friction;
        this.runwayType = runwayType;
        this.psi = psi;
        this.wind = wind;
        this.aircraftType = aircraftType;
        this.output = output;
    }

    public String getTakeoffMass() {
        return takeoffMass;
    }

    public void setTakeoffMass(String takeoffMass) {
        this.takeoffMass = takeoffMass;
    }

    public String getLandingMass() {
        return landingMass;
    }

    public void setLandingMass(String landingMass) {
        this.landingMass = landingMass;
    }

    public String getTemp() {
        return temp;
    }

    public void setTemp(String temp) {
        this.temp = temp;
    }

    public String getDrag() {
        return drag;
    }

    public void setDrag(String drag) {
        this.drag = drag;
    }

    public String getSlope() {
        return slope;
    }

    public void setSlope(String slope) {
        this.slope = slope;
    }

    public String getFriction() {
        return friction;
    }

    public void setFriction(String friction) {
        this.friction = friction;
    }

    public String getRunwayType() {
        return runwayType;
    }

    public void setRunwayType(String runwayType) {
        this.runwayType = runwayType;
    }

    public String getPsi() {
        return psi;
    }

    public void setPsi(String psi) {
        this.psi = psi;
    }

    public String getWind() {
        return wind;
    }

    public void setWind(String wind) {
        this.wind = wind;
    }

    public String getAircraftType() {
        return aircraftType;
    }

    public void setAircraftType(String aircraftType) {
        this.aircraftType = aircraftType;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }


    @Override
    public String toString() {
        return "Input{" +
                "takeoffMass='" + takeoffMass + '\'' +
                ", landingMass='" + landingMass + '\'' +
                ", temp='" + temp + '\'' +
                ", drag='" + drag + '\'' +
                ", slope='" + slope + '\'' +
                ", friction='" + friction + '\'' +
                ", runwayType='" + runwayType + '\'' +
                ", psi='" + psi + '\'' +
                ", wind='" + wind + '\'' +
                ", aircraftType='" + aircraftType + '\'' +
                ", output='" + output + '\'' +
                '}';
    }
}