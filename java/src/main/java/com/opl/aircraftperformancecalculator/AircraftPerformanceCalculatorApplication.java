package com.opl.aircraftperformancecalculator;

import com.opl.aircraftperformancecalculator.models.*;
import com.opl.aircraftperformancecalculator.repo.ProfileRepo;
import com.opl.aircraftperformancecalculator.security.SecurityConfig;
import com.opl.aircraftperformancecalculator.service.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

			profileService.save( new Profile("peytonhobson_profile1", "peytonhobson", "profile1", 288, 0, 52,
					400, true, 150));

			userService.saveUser(new User("peytonhobson", "password", "ROLE_USER"));
			userService.saveUser(new User("admin", "password", "ROLE_ADMIN"));
			userService.saveUser(new User("aDS", "password", "ROLE_USER"));

			pilotService.save(new Pilot("peytonhobson_Peyton", "peytonhobson", "Peyton", 145));
			pilotService.save(new Pilot("peytonhobson_Alex", "peytonhobson", "Alex", 170));

			activityLogService.save(new ActivityLog(1L,"peytonhobson", "",
					"calculator", "input", "output"));

//			authenticationService.saveCode(new AuthenticationCode("rxDLQ1EcnhM5"));
//			authenticationService.saveCode(new AuthenticationCode("DuU4dgwIZ0jI"));
//			authenticationService.saveCode(new AuthenticationCode("LiWjL9qOnTRu"));
//			authenticationService.saveCode(new AuthenticationCode("v7iWtMox595v"));
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
