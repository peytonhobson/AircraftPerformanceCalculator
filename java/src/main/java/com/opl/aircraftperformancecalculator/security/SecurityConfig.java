package com.opl.aircraftperformancecalculator.security;

import com.opl.aircraftperformancecalculator.filter.CustomAuthenticationFilter;
import com.opl.aircraftperformancecalculator.filter.CustomAuthorizationFilter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@PropertySource(value = {"classpath:application.yml"})
@Slf4j
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.key.name}")
    private String secret;

    @Value("${constant.aircraftMass.emptyAircraftKG}")
    private String empty;

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
        log.info(empty);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilterLogin = new CustomAuthenticationFilter(secret, authenticationManagerBean());
        customAuthenticationFilterLogin.setFilterProcessesUrl("/users/login");
        http.csrf().disable();
        http.authorizeRequests().antMatchers("/users/login/**", "/token/refresh/**",
                "/register/**").permitAll();
        http.authorizeRequests().antMatchers(GET,"/profiles/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(OPTIONS,"/profiles/**").permitAll();
        http.authorizeRequests().antMatchers(OPTIONS,"/users/register/**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/users/register/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(OPTIONS,"/airport/**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/airport/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(OPTIONS,"/attachments/**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/attachments/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(GET,"/attachments/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(OPTIONS,"/pilots/**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/pilots/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(GET,"/pilots/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(OPTIONS,"/calculate/**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/calculate/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.authorizeRequests().antMatchers(OPTIONS,"/users/**").permitAll();
        http.authorizeRequests().antMatchers(POST,"/users/**").hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers(GET,"/users/**").hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers(OPTIONS,"/constants/**").permitAll();
        http.authorizeRequests().antMatchers(GET,"/constants/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN");
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticationFilterLogin);
        http.addFilterBefore(new CustomAuthorizationFilter(secret), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
