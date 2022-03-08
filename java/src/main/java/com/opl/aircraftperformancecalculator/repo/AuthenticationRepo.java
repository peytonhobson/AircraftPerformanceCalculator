package com.opl.aircraftperformancecalculator.repo;

import com.opl.aircraftperformancecalculator.models.AuthenticationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthenticationRepo extends JpaRepository<AuthenticationCode, Long> {
    Integer deleteByCode(String code);
}
