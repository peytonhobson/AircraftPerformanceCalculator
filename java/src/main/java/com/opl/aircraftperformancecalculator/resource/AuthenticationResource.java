package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.*;
import com.opl.aircraftperformancecalculator.service.AuthenticationService;
import com.opl.aircraftperformancecalculator.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationResource {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping(path = "/authentication")
    public ResponseEntity<Response> register(@RequestBody AuthUser user) throws Exception {


        authenticationService.deleteAuthenticationCode(new AuthenticationCode(user.getCode()));
        log.info(user.getPassword());

        User newUser = new User(user.getUsername(), user.getPassword());
        userService.saveUser(newUser);

        // TODO: This is only temporary. Set actual API values.
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("authentication", true))
                        .message("Authentication returned")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
