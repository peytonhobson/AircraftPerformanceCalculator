package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.*;
import com.opl.aircraftperformancecalculator.service.implementation.ProfileServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

/**
 * Class acts as resource controller for aircraft profiles
 */
@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileResource {

    private final ProfileServiceImplementation profileService;

    /**
     * Returns all by username
     * @param username
     * @return
     */
    @GetMapping(path = "/{username}/all")
    public ResponseEntity<Response> returnAllProfiles(@PathVariable("username") String username) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("profiles", profileService.listByUsername(username)))
                        .message("Profiles retrieved")
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Returns the info of the profile by the name and user
     * @param username
     * @param profileName
     * @return
     */
    @GetMapping(path = "/{username}/{profileName}")
    public ResponseEntity<Response> returnProfile(@PathVariable("username") String username, @PathVariable("profileName") String profileName) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("profile", profileService.getByUsernameAndName(username, profileName)))
                        .message("Profiles retrieved")
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Saves profile to DB
     * @param profile
     * @return
     */
    @PostMapping(path = "/save")
    public ResponseEntity<Response> save(@RequestBody Profile profile) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("profile", profileService.save(profile)))
                        .message("Profile saved")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Deletes profile from DB
     * @param username
     * @param name
     * @return
     */
    @PostMapping(path = "/delete")
    public ResponseEntity<Response> delete(@RequestBody Map<String, String> json) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("profile", profileService.delete(json.get("username"), json.get("name"))))
                        .message("Profile deleted")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
