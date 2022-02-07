package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.Profile;

import java.io.FileNotFoundException;
import java.util.Collection;

public interface ProfileService {

    Profile save(Profile profile);
    Collection<Profile> list(int limit);
    Profile get(Long id);
    Profile update(Profile profile);
    Boolean delete(Long id);
    String calculate(Profile profile) throws FileNotFoundException;
}
