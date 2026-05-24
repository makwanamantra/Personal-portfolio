package com.mantra.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioApplication {
    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        System.out.println("\033[32m[MANTRA-JAVA]\033[0m Spring Boot service started successfully!");
    }
}