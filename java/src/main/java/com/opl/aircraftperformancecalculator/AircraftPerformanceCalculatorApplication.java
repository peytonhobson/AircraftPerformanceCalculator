package com.opl.aircraftperformancecalculator;

import com.opl.aircraftperformancecalculator.models.Loadout;
import com.opl.aircraftperformancecalculator.repo.LoadoutRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.filter.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@SpringBootApplication
public class AircraftPerformanceCalculatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(AircraftPerformanceCalculatorApplication.class, args);
	}

	@Bean
	CommandLineRunner run(LoadoutRepo loadoutRepo) {
		return args -> {
			loadoutRepo.save(new Loadout("Peyton_Test","Peyton", "Test", "5000", "5000",
					"20", "1", "5", "0.2", "concrete", "1000", "10", "combat", ""));
		};
	}

	@Bean
	public org.springframework.web.filter.CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "Filename"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
