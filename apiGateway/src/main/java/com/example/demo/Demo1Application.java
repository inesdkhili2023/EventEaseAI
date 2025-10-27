package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Demo1Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }
    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder){
        return builder.routes()
                // Route 1: malek service
                .route("backendIA",r->r.path("/api/events/**")
                        .uri("lb://backendIA") )
                // Route 2: ines service
                .route("EventEase-Ines", r -> r
                        .path("/api/partnerships/**")
                        .uri("lb://EventEase-Ines")
                )
                // Route 3: oumaima service
                .route("backendIAoumaima", r -> r
                        .path("/api/features/**")
                        .uri("lb://backendIAoumaima")
                )
                // Route 4: ons service
                .route("backendIAons", r -> r
                        .path("/api/**")
                        .uri("lb://backendIAons")
                )
                // Route 5: ahmed service
                .route("backendIAahmed", r -> r
                        .path("/api/**")
                        .uri("lb://backendIAahmed")
                )
                // Route 6: ala service
                .route("backendIAons", r -> r
                        .path("/api/**")
                        .uri("lb://backendIAons")
                )
                .build();
    }
}

