package com.opl.aircraftperformancecalculator;

import com.opl.aircraftperformancecalculator.models.*;
import com.opl.aircraftperformancecalculator.service.*;
import org.springframework.beans.factory.annotation.Value;
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
	CommandLineRunner run(ProfileService profileService, UserService userService,
						  AuthenticationService authenticationService,
						  PilotService pilotService, ActivityLogService activityLogService) {
		return args -> {

			userService.saveUser(new User("admin", "password", "ROLE_ADMIN"));
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

	@Value("${constant.aircraftMass.emptyAircraftKG}")
	private String emptyAircraftKG;

	@Bean
	public String getEmptyAircraftKG() {
		return emptyAircraftKG;
	}
}
