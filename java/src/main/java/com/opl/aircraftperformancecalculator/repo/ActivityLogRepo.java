package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityLogRepo extends JpaRepository<ActivityLog, Long> {
    List<ActivityLog> findAllByUsername(String username);
}
