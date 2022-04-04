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

@RestController
@RequestMapping("/activity-log")
@RequiredArgsConstructor
@Slf4j
public class ActivityLogResource {

    private final ActivityLogService activityLogService;

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

    @GetMapping(path = "/{username}")
    public ResponseEntity<Response> save(@PathVariable("username") String username) {
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

    @GetMapping(path = "/all")
    public ResponseEntity<Response> save() {
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
