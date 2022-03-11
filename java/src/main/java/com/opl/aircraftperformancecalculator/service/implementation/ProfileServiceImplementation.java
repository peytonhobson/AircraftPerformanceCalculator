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
import java.util.List;
import java.util.Optional;

import static java.lang.Boolean.TRUE;
import static org.springframework.data.domain.PageRequest.of;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ProfileServiceImplementation implements ProfileService {

    private final ProfileRepo profileRepo;

    @Override
    public Profile save(Profile profile) {
        log.info("Saving new profile: {}", profile.getName());
        return profileRepo.save(profile); //saves server to serverRepo
    }

    @Override
    public List<Profile> listByUsername(String username) {
        log.info("Fetching all profiles for: {} ", username);
        return profileRepo.findAllByUsername(username);
    }

    @Override
    public Profile update(Profile profile) {
        log.info("Updating Profile: {}", profile.getName());
        return profileRepo.save(profile);
    }

    @Override
    public Boolean delete(Long id) {
        log.info("Deleting Server by ID: {}", id);
        profileRepo.deleteById(id);
        return TRUE;
    }

    @Override
    public String calculate(Profile profile) throws FileNotFoundException {
        log.info("Calculating output of loadout");
        return OverallCalculator.getData(profile);
    }
}
