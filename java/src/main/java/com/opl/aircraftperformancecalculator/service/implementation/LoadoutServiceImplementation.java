package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.calculators.OverallCalculator;
import com.opl.aircraftperformancecalculator.models.Loadout;
import com.opl.aircraftperformancecalculator.repo.LoadoutRepo;
import com.opl.aircraftperformancecalculator.service.LoadoutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Collection;
import java.util.Random;

import static java.lang.Boolean.TRUE;
import static org.springframework.data.domain.PageRequest.of;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class LoadoutServiceImplementation implements LoadoutService {

    private final LoadoutRepo loadoutRepo;

    @Override
    public Loadout create(Loadout loadout) {
        log.info("Saving new loadout: {}", loadout.getLoadoutName());

        return loadoutRepo.save(loadout); //saves server to serverRepo
    }

    @Override
    public Loadout get(Long id) {
        log.info("Fetching server by id: {}", id);
        return loadoutRepo.findById(id).get();
    }

    @Override
    public Collection<Loadout> list(int limit) {
        log.info("Fetching all loadouts");
        return loadoutRepo.findAll(of(0, limit)).toList();
    }

    @Override
    public Loadout update(Loadout loadout) {
        log.info("Updating Loadout: {}", loadout.getLoadoutName());
        return loadoutRepo.save(loadout);
    }

    @Override
    public Boolean delete(Long id) {
        log.info("Deleting Server by ID: {}", id);
        loadoutRepo.deleteById(id);
        return TRUE;
    }

    @Override
    public Loadout calculate(Loadout loadout) throws FileNotFoundException {
        log.info("Calculating output of loadout");
        loadout.setOutput(OverallCalculator.getData(loadout));
        return loadoutRepo.save(loadout);
    }
}
