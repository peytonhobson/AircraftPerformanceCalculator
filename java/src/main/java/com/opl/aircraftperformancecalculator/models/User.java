package com.opl.aircraftperformancecalculator.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;

import javax.persistence.*;

import static javax.persistence.GenerationType.AUTO;

/**
 * Entity class to represent user.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name="username", length=50)
    private String username;

    private String password;
    private String role;
}
