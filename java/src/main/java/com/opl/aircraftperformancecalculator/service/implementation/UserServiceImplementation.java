package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.models.User;
import com.opl.aircraftperformancecalculator.repo.AuthenticationRepo;
import com.opl.aircraftperformancecalculator.repo.UserRepo;
import com.opl.aircraftperformancecalculator.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Service for users
 */
@Service @RequiredArgsConstructor
@Transactional @Slf4j
public class UserServiceImplementation implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    /**
     * Method used by authorization manager to verify user and authorities
     * @param username
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if(user == null) {
            log.error("User not found in database");
            throw new UsernameNotFoundException("User not found in database");
        }

        Collection<SimpleGrantedAuthority> authorities  = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public User saveUser(User user) {
        log.info("Saving new user {} to database", user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public User getUser(String username) {
        log.info("Getting user {} from database", username);
        return userRepo.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        log.info("Getting all users from database");
        return userRepo.findAll();
    }

    @Override
    public Integer deleteUser(String username) {
        log.info("Deleting user: {}", username);
        return userRepo.deleteByUsername(username);
    }
}
