package com.opl.aircraftperformancecalculator;

import com.opl.aircraftperformancecalculator.models.AuthenticationCode;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.models.User;
import com.opl.aircraftperformancecalculator.repo.ProfileRepo;
import com.opl.aircraftperformancecalculator.service.AuthenticationService;
import com.opl.aircraftperformancecalculator.service.ProfileService;
import com.opl.aircraftperformancecalculator.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@Order(1)
public class AircraftPerformanceCalculatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(AircraftPerformanceCalculatorApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ProfileService profileService, UserService userService, AuthenticationService authenticationService) {
		System.out.println("here");
		return args -> {
			profileService.save(new Profile("Peyton","Peyto", "Test", "5000", "5000",
					"20", "1", "5", "0.2", "con", "1000", "10", "combat", ""));
			userService.saveUser(new User("peytonhobson", "password"));
			userService.saveUser(new User("johnsmith", "password"));
			userService.saveUser(new User("apple", "password"));
			authenticationService.saveCode(new AuthenticationCode("rxDLQ1EcnhM5"));
			authenticationService.saveCode(new AuthenticationCode("DuU4dgwIZ0jI"));
			authenticationService.saveCode(new AuthenticationCode("LiWjL9qOnTRu"));
			authenticationService.saveCode(new AuthenticationCode("v7iWtMox595v"));
		};
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
