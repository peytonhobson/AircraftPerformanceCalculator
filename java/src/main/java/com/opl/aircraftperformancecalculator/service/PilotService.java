package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.Pilot;

import java.util.List;

public interface PilotService {

    Pilot save(Pilot pilot);
    List<Pilot> listByUsername(String username);
    Pilot getByID(String id);
    Integer deletePilot(String id);
}
