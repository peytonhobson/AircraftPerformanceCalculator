package com.opl.aircraftperformancecalculator.security;

import com.opl.aircraftperformancecalculator.filter.CustomAuthenticationFilter;
import com.opl.aircraftperformancecalculator.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilterLogin = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilterLogin.setFilterProcessesUrl("/users/login");
        http.csrf().disable();
        http.authorizeRequests().antMatchers("/users/login/**", "/token/refresh/**",
                "/register/**").permitAll();
        http.authorizeRequests().antMatchers(GET,"/users/**").permitAll();
        http.authorizeRequests().antMatchers(OPTIONS,"/users/**").permitAll();
        http.authorizeRequests().antMatchers(GET,"/profiles/**").permitAll();
        http.authorizeRequests().antMatchers(OPTIONS,"/profiles/**").permitAll();
        http.authorizeRequests().antMatchers(OPTIONS,"/users/register/**").hasAnyAuthority("ROLE_USER");
        http.authorizeRequests().antMatchers(POST,"/users/register/**").hasAnyAuthority("ROLE_USER");
        http.sessionManagement().sessionCreationPolicy(STATELESS);
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticationFilterLogin);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
