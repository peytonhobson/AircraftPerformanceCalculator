package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.models.ActivityLog;
import com.opl.aircraftperformancecalculator.repo.ActivityLogRepo;
import com.opl.aircraftperformancecalculator.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ActivityLogServiceImplementation implements ActivityLogService {

    private final ActivityLogRepo activityLogRepo;

    @Override
    public List<ActivityLog> getByUsername(String username) {
        log.info("Getting all logs by username: {}", username);
        return activityLogRepo.findAllByUsername(username);
    }

    @Override
    public List<ActivityLog> getAll() {
        log.info("Getting all logs");
        return activityLogRepo.findAll();
    }

    @Override
    public ActivityLog save(ActivityLog activityLog) {
        log.info("Saving Activity Log.");
        return activityLogRepo.save(activityLog);
    }
}
