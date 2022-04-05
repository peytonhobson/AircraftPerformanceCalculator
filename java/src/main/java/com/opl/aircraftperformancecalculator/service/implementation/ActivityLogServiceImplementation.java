package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.models.ActivityLog;
import com.opl.aircraftperformancecalculator.repo.ActivityLogRepo;
import com.opl.aircraftperformancecalculator.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Service for activity logs that makes direct requests with repo interface.
 */
@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ActivityLogServiceImplementation implements ActivityLogService {

    private final ActivityLogRepo activityLogRepo;

    /**
     * Returns all activity logs by username
     * @param username
     * @return
     */
    @Override
    public List<ActivityLog> getByUsername(String username) {
        log.info("Getting all logs by username: {}", username);
        return activityLogRepo.findAllByUsername(username);
    }

    /**
     * Returns all activity logs from repo
     * @return
     */
    @Override
    public List<ActivityLog> getAll() {
        log.info("Getting all logs");
        return activityLogRepo.findAll();
    }

    /**
     * Saves activity log to repo
     * @param activityLog
     * @return
     */
    @Override
    public ActivityLog save(ActivityLog activityLog) {
        log.info("Saving Activity Log.");
        return activityLogRepo.save(activityLog);
    }
}
