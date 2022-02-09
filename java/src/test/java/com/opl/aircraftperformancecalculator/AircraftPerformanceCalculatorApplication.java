package com.opl.aircraftperformancecalculator;

import com.opl.aircraftperformancecalculator.models.Profile;
import com.opl.aircraftperformancecalculator.repo.ProfileRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;

@EnableAutoConfiguration
@ComponentScan
public class AircraftPerformanceCalculatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(AircraftPerformanceCalculatorApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ProfileRepo loadoutRepo) {
		return args -> {
			loadoutRepo.save(new Profile("Peyton_Test","Peyton", "Test", "5000", "5000",
					"20", "1", "5", "0.2", "concrete", "1000", "10", "combat", ""));
		};
	}

//	@Configuration
//	protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//		@Override
//		protected void configure(HttpSecurity http) throws Exception {
//			http
//					.cors()
//					.and()
//					.authorizeRequests()
//					.anyRequest().authenticated();
//
//		}
//	}
//
//	@Bean
//	HeaderHttpSessionStrategy sessionStrategy() {
//		return new HeaderHttpSessionStrategy();
//	}

}
