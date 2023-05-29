package com.maxprev.maxprev.workout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository){
        this.workoutRepository = workoutRepository;

    }

    public void addNewWorkout(Workout workout) {
        Optional<Workout> workoutOptional = workoutRepository
                .findWorkoutByYearAndDateAndName(workout.getYear(), workout.getDate(), workout.getName());
        if (workoutOptional.isPresent()){
            throw new IllegalStateException("Duplicate");
        }
        workoutRepository.save(workout);
        System.out.println(workout);
    }

    public List<Workout> getWorkouts() {
        return workoutRepository.findAll();
    }

    public void deleteWorkout(String workoutYear, String workoutDate, String workoutName) {
        Optional<Workout> workoutOptional = workoutRepository
                .findWorkoutByYearAndDateAndName(workoutYear, workoutDate, workoutName);
        if (!workoutOptional.isPresent()){
            throw new IllegalStateException("Doesn't exist");
        }
        workoutRepository.deleteById(workoutOptional.get().getId());
    }
}
