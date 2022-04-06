package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.models.Pilot;
import com.opl.aircraftperformancecalculator.repo.PilotRepo;
import com.opl.aircraftperformancecalculator.service.PilotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Service for pilot
 */
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

    /**
     * Lists all pilots for user
     * @param username
     * @return
     */
    @Override
    public List<Pilot> listByUsername(String username) {
        log.info("Returning pilots by username: {}", username);
        return pilotRepo.findAllByUsername(username);
    }

    /**
     * Returns pilot by id (Username_name)
     * @param id
     * @return
     */
    @Override
    public Pilot getByID(String id) {
       log.info("Returning pilot by id: {}", id);
       return pilotRepo.findById(id);
    }

    @Override
    public Integer delete(String username, String name) {
        log.info("Deleting pilot");
        log.info(username + " " + name);
        return pilotRepo.deleteByNameAndUsername(name, username);
    }
}
