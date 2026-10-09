package com.sms.student_mgt_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // compare the typed password with the password in MySQL
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); //no hashing and compares the two as plain text
    }

    //given by my AI intern
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // On wrong/missing login: reply 401 as JSON
        AuthenticationEntryPoint jsonEntryPoint = (request, response, authException) -> {
            response.setStatus(401);
            response.setContentType("application/json"); //sending JSON
            response.getWriter().write("{\"status\":401,\"message\":\"Invalid or missing credentials\"}");
        };


        http
                .csrf(csrf -> csrf.disable()) //app doesn't use cookies for login.
                .cors(Customizer.withDefaults())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/api/**").authenticated() //Every API URL needs a valid login
                        .anyRequest().authenticated())
                .httpBasic(basic -> basic.authenticationEntryPoint(jsonEntryPoint)) //HTTP Basic Authentication
                .exceptionHandling(ex -> ex.authenticationEntryPoint(jsonEntryPoint));

        return http.build();
    }

    // Allow the React app (different port) to call this API
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
