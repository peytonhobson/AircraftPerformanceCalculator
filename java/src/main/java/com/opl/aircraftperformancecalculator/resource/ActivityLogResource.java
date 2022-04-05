package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.ActivityLog;
import com.opl.aircraftperformancecalculator.models.Response;
import com.opl.aircraftperformancecalculator.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

/**
 * Resource to request items related to acitivity logs
 */
@RestController
@RequestMapping("/activity-log")
@RequiredArgsConstructor
@Slf4j
public class ActivityLogResource {

    private final ActivityLogService activityLogService;

    /**
     * Saves activity log and returns saved activity log as response.
     * @param activityLog
     * @return
     */
    @PostMapping(path = "/save")
    public ResponseEntity<Response> save(@RequestBody ActivityLog activityLog) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("activityLogs", activityLogService.save(activityLog)))
                        .message("Log saved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Returns all activity logs by username
     * @param username
     * @return
     */
    @GetMapping(path = "/{username}")
    public ResponseEntity<Response> getByUsername(@PathVariable("username") String username) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("activityLogs", activityLogService.getByUsername(username)))
                        .message("Logs returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Returns all logs
     * @return
     */
    @GetMapping(path = "/all")
    public ResponseEntity<Response> getAllLogs() {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("activityLogs", activityLogService.getAll()))
                        .message("Logs returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
