package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.User;

import java.util.List;

public interface UserService {

    User saveUser(User user);
    User getUser(String username);

    //TODO:create limit
    List<User> getUsers();

}
