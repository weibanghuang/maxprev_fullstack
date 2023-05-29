package com.maxprev.maxprev.workout;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkoutRepository
        extends JpaRepository<Workout, Long> {


    Optional<Workout> findWorkoutByYearAndDateAndName(String year, String date, String name);

}
