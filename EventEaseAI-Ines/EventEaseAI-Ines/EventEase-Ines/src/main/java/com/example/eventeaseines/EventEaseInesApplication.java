package com.example.eventeaseines;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@EnableDiscoveryClient
@SpringBootApplication
//@ComponentScan(basePackages = {"com.example.eventeaseines", "Security"})
public class EventEaseInesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventEaseInesApplication.class, args);
	}



	}


