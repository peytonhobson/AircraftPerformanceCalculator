package com.opl.aircraftperformancecalculator;

import com.opl.aircraftperformancecalculator.models.Attachment;
import com.opl.aircraftperformancecalculator.models.AuthenticationCode;
import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.models.User;
import com.opl.aircraftperformancecalculator.repo.ProfileRepo;
import com.opl.aircraftperformancecalculator.service.AttachmentService;
import com.opl.aircraftperformancecalculator.service.AuthenticationService;
import com.opl.aircraftperformancecalculator.service.ProfileService;
import com.opl.aircraftperformancecalculator.service.UserService;
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
						  AuthenticationService authenticationService, AttachmentService attachmentService) {
		return args -> {
			Attachment attachment = new Attachment();
			attachment.setId("peytonhobson_asdf");
			attachment.setName("asdf");
			attachment.setUsername("peytonhobson");
			Profile profile = new Profile();
			profile.setName("asdf");
			profile.setUsername("peytonhobson");
			profile.getAttachments().add(attachment);
			attachment.getProfiles().add(profile);
			profileService.save(profile);
			userService.saveUser(new User("peytonhobson", "password"));
//			userService.saveUser(new User("johnsmith", "password"));
//			userService.saveUser(new User("apple", "password"));
//			authenticationService.saveCode(new AuthenticationCode("rxDLQ1EcnhM5"));
//			authenticationService.saveCode(new AuthenticationCode("DuU4dgwIZ0jI"));
//			authenticationService.saveCode(new AuthenticationCode("LiWjL9qOnTRu"));
//			authenticationService.saveCode(new AuthenticationCode("v7iWtMox595v"));
//			attachmentService.save(new Attachment("peytonhobson_1", "1", "prof1",
//					"peytonhobson", 100 ));
//			attachmentService.save(new Attachment("peytonhobson_2", "2", "prof1",
//					"peytonhobson", 100 ));
//			attachmentService.save(new Attachment("peytonhobson_3", "3", "prof1",
//					"peytonhobson", 100 ));
		};
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
