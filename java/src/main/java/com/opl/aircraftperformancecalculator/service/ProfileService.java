package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.Profile;

import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.List;

public interface ProfileService {

    Profile save(Profile profile);
    Profile update(Profile profile);
    Boolean delete(Long id);
    String calculate(Profile profile) throws FileNotFoundException;
    List<Profile> listByUsername(String username);
}
