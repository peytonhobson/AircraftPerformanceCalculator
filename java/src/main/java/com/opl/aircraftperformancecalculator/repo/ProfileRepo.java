package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProfileRepo extends JpaRepository<Profile, Long> {

    List<Profile> findAllByProfileName(String profileName);
    List<Profile> findAllByUserID(String userID);
    List<Profile> findProfilesByUserID(String userID);
}
