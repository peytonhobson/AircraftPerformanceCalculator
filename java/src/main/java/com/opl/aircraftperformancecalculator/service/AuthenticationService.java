package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.AuthenticationCode;
import com.opl.aircraftperformancecalculator.models.User;

import java.util.List;

public interface AuthenticationService {

    Boolean deleteAuthenticationCode(AuthenticationCode code);
    AuthenticationCode saveCode(AuthenticationCode code);
}
