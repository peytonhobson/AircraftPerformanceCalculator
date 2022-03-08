package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

