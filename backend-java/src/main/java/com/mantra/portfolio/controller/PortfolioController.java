package com.mantra.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PortfolioController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("service", "mantra-portfolio-java-api");
        response.put("status", "online");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("message", "☕ Java Spring Boot service running!");
        response.put("endpoints", List.of("/api/info", "/api/experience", "/api/certifications", "/actuator/health"));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getInfo() {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("name", "Mantra Makwana");
        data.put("role", "Full-Stack Developer & IT Specialist");
        data.put("javaExpertise", List.of(
            "Spring Boot & Spring MVC",
            "Java 17+ Features (Records, Sealed Classes, Pattern Matching)",
            "JPA / Hibernate ORM",
            "Maven & Gradle Build Tools",
            "Design Patterns (Singleton, Factory, Observer, Strategy)",
            "Multithreading & Concurrency",
            "JUnit 5 & Mockito Testing",
            "Microservices Architecture"
        ));
        data.put("currentlyLearning", List.of("Kotlin", "Quarkus", "GraalVM Native Image"));

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/experience")
    public ResponseEntity<Map<String, Object>> getExperience() {
        List<Map<String, Object>> experiences = new ArrayList<>();

        Map<String, Object> exp1 = new LinkedHashMap<>();
        exp1.put("title", "Full-Stack Developer");
        exp1.put("type", "Freelance / Projects");
        exp1.put("duration", "2022 - Present");
        exp1.put("description", "Building full-stack applications using Java, Python, and MERN stack. Designing PostgreSQL schemas and deploying on cloud platforms.");
        exp1.put("tech", List.of("Java", "Spring Boot", "React", "Node.js", "PostgreSQL", "Docker"));
        experiences.add(exp1);

        Map<String, Object> exp2 = new LinkedHashMap<>();
        exp2.put("title", "IT Systems Specialist");
        exp2.put("type", "Technical Role");
        exp2.put("duration", "2021 - Present");
        exp2.put("description", "Managing IT infrastructure, network configuration, server administration, and implementing security protocols.");
        exp2.put("tech", List.of("Linux", "Networking", "Security", "Bash", "Python Automation"));
        experiences.add(exp2);

        Map<String, Object> exp3 = new LinkedHashMap<>();
        exp3.put("title", "Java Developer");
        exp3.put("type", "Academic & Personal Projects");
        exp3.put("duration", "2020 - 2022");
        exp3.put("description", "Developed Java applications including encryption tools, data structures implementations, and algorithm visualizers.");
        exp3.put("tech", List.of("Java", "JavaFX", "Maven", "MySQL", "OOP"));
        experiences.add(exp3);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("data", experiences);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/certifications")
    public ResponseEntity<Map<String, Object>> getCertifications() {
        List<Map<String, String>> certs = new ArrayList<>();
        certs.add(Map.of("name", "Oracle Certified Java SE Developer", "issuer", "Oracle", "year", "2023"));
        certs.add(Map.of("name", "AWS Cloud Practitioner", "issuer", "Amazon Web Services", "year", "2023"));
        certs.add(Map.of("name", "PostgreSQL Administration", "issuer", "PostgreSQL.org", "year", "2022"));
        certs.add(Map.of("name", "Python for Data Science", "issuer", "Coursera / IBM", "year", "2022"));
        certs.add(Map.of("name", "React Developer Certification", "issuer", "Meta / Coursera", "year", "2023"));

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("data", certs);
        return ResponseEntity.ok(response);
    }
}