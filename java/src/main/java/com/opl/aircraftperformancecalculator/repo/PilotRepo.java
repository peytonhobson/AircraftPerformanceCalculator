package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.Pilot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PilotRepo extends JpaRepository<Pilot, Long> {
    Pilot findById(String id);
    List<Pilot> findAllByUsername(String username);
    Integer deleteByNameAndUsername(String name, String username);
}
