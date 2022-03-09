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

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

/**
 * Class acts as Controller for Rest API
 */
@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
public class ProfileResource {

    private final ProfileServiceImplementation profileService;

    @PostMapping(path = "/calculator")
    public ResponseEntity<Response> calculate(@RequestBody Profile profile) throws Exception {

        // TODO: This is only temporary. Set actual API values.
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("output", profileService.calculate(profile)))
                        .message("Output returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @GetMapping(path = "/{username}/all")
    public ResponseEntity<Response> returnLoadout(@PathVariable("username") String username) {
        System.out.println(username);
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("profiles", profileService.listByUsername(username)))
                        .message("Profiles retrieved")
                        .statusCode(OK.value())
                        .build()
        );
    }

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
}
