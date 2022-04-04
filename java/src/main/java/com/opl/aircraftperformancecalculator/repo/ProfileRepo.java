package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProfileRepo extends JpaRepository<Profile, Long> {
    List<Profile> findAllByUsername(String userID);
    Profile findByUsernameAndName(String username, String name);
    Integer deleteByNameAndUsername(String name, String username);
}
