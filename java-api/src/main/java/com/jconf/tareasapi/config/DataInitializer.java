package com.jconf.tareasapi.config;

import com.jconf.tareasapi.model.Tarea;
import com.jconf.tareasapi.repository.TareaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    
    @Bean
    CommandLineRunner initDatabase(TareaRepository repository) {
        return args -> {
            repository.save(new Tarea("Aprender Spring Boot", true));
            repository.save(new Tarea("Configurar Spring Data JPA", true));
            repository.save(new Tarea("Crear API REST", false));
        };
    }
}
