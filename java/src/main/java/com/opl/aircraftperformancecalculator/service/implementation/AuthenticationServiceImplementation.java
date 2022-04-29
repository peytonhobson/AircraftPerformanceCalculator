package com.opl.aircraftperformancecalculator.service.implementation;

import com.opl.aircraftperformancecalculator.models.AuthenticationCode;
import com.opl.aircraftperformancecalculator.repo.AuthenticationRepo;
import com.opl.aircraftperformancecalculator.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


/**
 * Service for saving and deleting authentication codes from DB
 */
@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class AuthenticationServiceImplementation implements AuthenticationService {

    private final AuthenticationRepo authenticationRepo;

    @Override
    public Integer deleteAuthenticationCode(AuthenticationCode code) {
        log.info("Deleting Authentication Code {} ", code.getCode());
        return authenticationRepo.deleteByCode(code.getCode());
    }

    @Override
    public AuthenticationCode saveCode(AuthenticationCode code) {
        log.info("Saving Authentication Code {} ", code.getCode());
        return authenticationRepo.save(code);
    }
}
