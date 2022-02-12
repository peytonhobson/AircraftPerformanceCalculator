package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.AuthenticationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthenticationRepo extends JpaRepository<AuthenticationCode, Long> {
    Integer deleteByCode(String code);
}
