package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
    Integer deleteByUsername(String username);
}

