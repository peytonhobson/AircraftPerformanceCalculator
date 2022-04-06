package com.opl.aircraftperformancecalculator.resource;

import com.opl.aircraftperformancecalculator.models.*;
import com.opl.aircraftperformancecalculator.service.AuthenticationService;
import com.opl.aircraftperformancecalculator.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.OK;

/**
 * Resource for registering with authentication codes
 */
@RestController
@RequestMapping("/register")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationResource {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    /**
     * Function thats called to register user.
     * @param user
     * @return
     * @throws Exception
     */
    @PostMapping(path = "/authentication")
    public ResponseEntity<Response> register(@RequestBody AuthUser user) throws Exception {


        // Returns error if username is already taken
        if (userService.getUser(user.getUsername()) != null) {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .data(of("usernameTaken", true))
                            .message("Username has already been taken")
                            .status(FORBIDDEN)
                            .statusCode(FORBIDDEN.value())
                            .build()
            );
        }

        // Checks if authentication code is in database. Returns error if deletion doesnt't work
        if (authenticationService.deleteAuthenticationCode(new AuthenticationCode(user.getCode())) != 1) {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(now())
                            .data(of("invalidAuthenticationCode", true))
                            .message("Invalid Authentication Code")
                            .status(FORBIDDEN)
                            .statusCode(FORBIDDEN.value())
                            .build()
            );
        }

        User newUser = new User(user.getUsername(), user.getPassword(), user.getRole());
        userService.saveUser(newUser);

        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("authentication", true))
                        .message("User Authenticated")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Function to save authentication code
     * @param code
     * @return
     * @throws Exception
     */
    @PostMapping(path = "/save")
    public ResponseEntity<Response> register(@RequestBody AuthenticationCode code) throws Exception {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of(true, authenticationService.saveCode(code)))
                        .message("Authentication code saved.")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }
}
