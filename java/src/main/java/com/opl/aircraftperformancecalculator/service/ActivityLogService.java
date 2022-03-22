package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.ActivityLog;
import com.opl.aircraftperformancecalculator.repo.ActivityLogRepo;

import java.util.List;

public interface ActivityLogService {

    List<ActivityLog> getByUsername(String username);
    List<ActivityLog> getAll();
    ActivityLog save(ActivityLog activityLog);
}
