package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.Loadout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface LoadoutRepo extends JpaRepository<Loadout, Long> {

    List<Loadout> findAllByLoadoutName(String loadoutName);
    List<Loadout> findAllByUserID(String userID);
}
