package com.opl.aircraftperformancecalculator.service;

import com.opl.aircraftperformancecalculator.models.User;

import java.util.List;

public interface UserService {

    User saveUser(User user);
    User getUser(String username);
    List<User> getUsers();
    Integer deleteUser(String username);

}
