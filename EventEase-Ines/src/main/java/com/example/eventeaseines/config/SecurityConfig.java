package com.example.eventeaseines.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Désactive la protection CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/**").permitAll() // Autorise tout le monde sur /api/
                        .anyRequest().permitAll()
                )
                .cors(cors -> cors.disable()); // ou active-le selon ton besoin
        return http.build();
    }
}
