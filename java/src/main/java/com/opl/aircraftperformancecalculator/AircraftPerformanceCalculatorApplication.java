package com.opl.aircraftperformancecalculator;

import com.opl.aircraftperformancecalculator.models.*;
import com.opl.aircraftperformancecalculator.repo.ProfileRepo;
import com.opl.aircraftperformancecalculator.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
						  AuthenticationService authenticationService, AttachmentService attachmentService,
						  PilotService pilotService) {
		return args -> {
			Attachment attachment1 = new Attachment();
			attachment1.setId("peytonhobson_attachment1");
			attachment1.setName("attachment2");
			attachment1.setUsername("peytonhobson");
			attachment1.setMass(200);
			attachmentService.save(attachment1);

			Attachment attachment2 = new Attachment();
			attachment2.setId("peytonhobson_attachment2");
			attachment2.setName("attachment2");
			attachment2.setUsername("peytonhobson");
			attachment2.setMass(100);
			attachmentService.save(attachment2);

			Attachment attachment3 = new Attachment();
			attachment3.setId("peytonhobson_attachment3");
			attachment3.setName("attachment3");
			attachment3.setUsername("peytonhobson");
			attachment3.setMass(400);
			attachmentService.save(attachment3);

			Profile profile = new Profile();
			profile.setName("profile1");
			profile.setUsername("peytonhobson");
			profile.setAttachments(new HashSet<>(List.of(attachment1, attachment2, attachment3)));
			profile.setInternalTank(78);
			profile.setDropTank(50);
			profile.setTipTank(50);
			profileService.save(profile);
			userService.saveUser(new User("peytonhobson", "password"));

			pilotService.save(new Pilot("peytonhobson_peyton", "peytonhobson", "peyton", 100));

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
}
