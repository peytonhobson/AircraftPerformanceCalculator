package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.Profile;

import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.List;

public interface ProfileService {
    Profile save(Profile profile);
    List<Profile> listByUsername(String username);
    Profile getByUsernameandName(String username, String profileName);
    Integer delete(String name, String username);
}
