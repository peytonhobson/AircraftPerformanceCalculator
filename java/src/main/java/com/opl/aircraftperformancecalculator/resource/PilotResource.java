package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.Pilot;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.models.Response;
import com.opl.aircraftperformancecalculator.service.implementation.PilotServiceImplementation;
import com.opl.aircraftperformancecalculator.service.implementation.ProfileServiceImplementation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

/**
 * Resource used for fetching and saving pilot entities
 */
@RestController
@RequestMapping("/pilots")
@RequiredArgsConstructor
@Slf4j
public class PilotResource {

    private final PilotServiceImplementation pilotService;

    /**
     * Returns all pilots by username
     * @param username
     * @return
     */
    @GetMapping(path = "/{username}/all")
    public ResponseEntity<Response> getByUsername(@PathVariable(name = "username") String username) {

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("pilots", pilotService.listByUsername(username)))
                        .message("Pilots returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Returns pilot by id (username_name)
     * @param id
     * @return
     */
    @GetMapping(path = "/{id}")
    public ResponseEntity<Response> getByID(@PathVariable(name = "id") String id) {

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("pilot", pilotService.getByID(id)))
                        .message("Pilot returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Saves pilot to DB
     * @param pilot
     * @return
     * @throws Exception
     */
    @PostMapping(path = "/save")
    public ResponseEntity<Response> save(@RequestBody Pilot pilot) throws Exception {

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("pilots", pilotService.save(pilot)))
                        .message("Pilot Saved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @PostMapping(path = "/delete")
    public ResponseEntity<Response> delete(@RequestBody Map<String, String> json) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("pilot", pilotService.delete(json.get("username"), json.get("name"))))
                        .message("Pilot deleted")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
