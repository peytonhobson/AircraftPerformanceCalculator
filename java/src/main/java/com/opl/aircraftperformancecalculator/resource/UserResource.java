package com.opl.aircraftperformancecalculator.resource;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opl.aircraftperformancecalculator.models.Response;
import com.opl.aircraftperformancecalculator.models.User;
import com.opl.aircraftperformancecalculator.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.LocalDateTime.now;
import static java.util.Arrays.stream;
import static java.util.Map.of;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

/**
 * Controller to fetch and save users in db. Generally limited to admin role.
 */
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserResource {

    private final UserService userService;

    /**
     * Returns all users from DB.
     * @return
     */
    @GetMapping("/all")
    public ResponseEntity<Response> getUsers() {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("users", userService.getUsers()))
                        .message("User retrieved")
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Saves user to DB
     * @param user
     * @return
     */
    @PostMapping("/save")
    public ResponseEntity<Response> saveUser(@RequestBody User user) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user", userService.saveUser(user)))
                        .message("User retrieved")
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Returns user by username;
     * @param username
     * @return
     */
    @GetMapping("/{username}")
    public ResponseEntity<Response> getUser(@PathVariable String username) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user", userService.getUser(username)))
                        .message("User retrieved")
                        .statusCode(OK.value())
                        .build()
        );
    }

    /**
     * Returns user by username;
     * @param username
     * @return
     */
    @PostMapping("/delete")
    public ResponseEntity<Response> deleteUser(@RequestBody Map<String, String> json) {
        return ResponseEntity.ok(
                Response.builder()
                        .timeStamp(now())
                        .data(of("user", userService.deleteUser(json.get("username"))))
                        .message("User deleted")
                        .statusCode(OK.value())
                        .build()
        );
    }

//    @GetMapping("/authenticated")
//    public ResponseEntity<String> authenticate() {
//        log.info("authenticating");
//        return ResponseEntity.ok().body("true");
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<Boolean> register(@RequestBody User user) {
//        log.info("Registering User {}", user.getUsername());
//        userService.saveUser(user);
//        return ResponseEntity.ok().body(true);
//    }

//    @GetMapping("/token/refresh")
//    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        String authorizationHeader = request.getHeader(AUTHORIZATION);
//        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
//            try {
//                String refresh_token  = authorizationHeader.substring("Bearer ".length());
//                //TODO: Alter this in production (secret)
//                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
//                JWTVerifier verifier = JWT.require(algorithm).build();
//                DecodedJWT decodedJWT = verifier.verify(refresh_token);
//                String username = decodedJWT.getSubject();
//                User user = userService.getUser(username);
//                String access_token = JWT.create()
//                        .withSubject(user.getUsername())
//                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 1000))
//                        .withIssuer(request.getRequestURL().toString())
//                        .withClaim("roles", "ROLE_USER")
//                        .sign(algorithm);
//                Map<String, String> tokens = new HashMap<>();
//                tokens.put("access_token", access_token);
//                tokens.put("refresh_token", refresh_token);
//                response.setContentType(APPLICATION_JSON_VALUE);
//                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
//            }
//            catch(Exception exception) {
//                response.setHeader("error", exception.getMessage());
//                response.setStatus(FORBIDDEN.value());
//                Map<String, String> error = new HashMap<>();
//                error.put("error_message", exception.getMessage());
//                response.setContentType(APPLICATION_JSON_VALUE);
//                new ObjectMapper().writeValue(response.getOutputStream(), error);
//            }
//
//        }
//        else {
//            throw new RuntimeException("Refresh token is missing");
//        }
//    }
}
