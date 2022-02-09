package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.calculators.OverallCalculator;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.repo.ProfileRepo;
import com.opl.aircraftperformancecalculator.service.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.FileNotFoundException;
import java.util.Collection;

import static java.lang.Boolean.TRUE;
import static org.springframework.data.domain.PageRequest.of;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ProfileServiceImplementation implements ProfileService {

    private final ProfileRepo loadoutRepo;

    @Override
    public Profile save(Profile profile) {
        log.info("Saving new loadout: {}", profile.getProfileName());
        return loadoutRepo.save(profile); //saves server to serverRepo
    }

    @Override
    public Profile get(Long id) {
        log.info("Fetching server by id: {}", id);
        return loadoutRepo.findById(id).get();
    }

    @Override
    public Collection<Profile> list(int limit) {
        log.info("Fetching all loadouts" + loadoutRepo.findAll(of(0, limit)).toList());
        return loadoutRepo.findAll(of(0, limit)).toList();
    }

    @Override
    public Profile update(Profile profile) {
        log.info("Updating Loadout: {}", profile.getProfileName());
        return loadoutRepo.save(profile);
    }

    @Override
    public Boolean delete(Long id) {
        log.info("Deleting Server by ID: {}", id);
        loadoutRepo.deleteById(id);
        return TRUE;
    }

    @Override
    public String calculate(Profile profile) throws FileNotFoundException {
        log.info("Calculating output of loadout");
        profile.setOutput(OverallCalculator.getData(profile));
        return OverallCalculator.getData(profile);
    }
}
