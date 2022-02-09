package com.opl.aircraftperformancecalculator.resource;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@CrossOrigin(origins="*", maxAge = 3600, allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserResource {

    /**
     *  If the "/user" resource is reachable then it will return the currently
     *  authenticated user (an Authentication), and otherwise Spring Security will
     *  intercept the request and send a 401 response through an AuthenticationEntryPoint.
     * @param user
     * @return
     */
    @GetMapping("/current")
    public Principal user(Principal user) {
        System.out.println("here");
        return user;
    }

    @GetMapping("/token")
    public Map<String,String> token(HttpSession session) {
        return Collections.singletonMap("token", session.getId());
    }
}
