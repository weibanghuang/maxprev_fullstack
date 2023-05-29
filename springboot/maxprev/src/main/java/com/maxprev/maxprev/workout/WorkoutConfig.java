package com.maxprev.maxprev.workout;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class WorkoutConfig {
    @Bean
    CommandLineRunner commandLineRunner(WorkoutRepository repository) {
        return args -> {
//            Workout blah = new Workout(
//                    "20230506",
//                    "051239",
//                    "Single Calve Raise",
//                    8L,
//                    50L
//            );

//            repository.saveAll(
//                    List.of(blah)
//            );
        };
    }
}
