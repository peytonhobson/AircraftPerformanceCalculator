package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepo extends JpaRepository<Profile, Long> {
    List<Profile> findAllByUserID(String userID);
}
