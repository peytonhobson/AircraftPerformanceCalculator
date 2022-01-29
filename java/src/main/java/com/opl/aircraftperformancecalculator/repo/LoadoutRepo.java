package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.Loadout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoadoutRepo extends JpaRepository<Loadout, Long> { // Server is type being managed and Long is id

    List<Loadout> findAllByLoadoutName(String loadoutName);
    List<Loadout> findAllByUserID(String userID);
}
