package com.opl.java.com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {

    List<User> findByUsername(String username);
}
