package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.models.Pilot;
import com.opl.aircraftperformancecalculator.repo.PilotRepo;
import com.opl.aircraftperformancecalculator.service.PilotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class PilotServiceImplementation implements PilotService {

    private final PilotRepo pilotRepo;

    @Override
    public Pilot save(Pilot pilot) {
        log.info("Saving pilot: {}", pilot.getName());
        return pilotRepo.save(pilot);
    }

    @Override
    public List<Pilot> listByUsername(String username) {
        log.info("Returning pilots by username: {}", username);
        return pilotRepo.findAllByUsername(username);
    }

    @Override
    public Pilot getByID(String id) {
       log.info("Returning pilot by id: {}", id);
       return pilotRepo.findById(id);
    }

    @Override
    public Integer deletePilot(String id) {
        log.info("Deleting pilot by ID: {}", id);
        return pilotRepo.deleteById(id);
    }
}
