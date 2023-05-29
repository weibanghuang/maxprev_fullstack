package com.maxprev.maxprev.workout;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/workout")
@CrossOrigin(origins = "https://weibanghuang.github.io")
public class WorkoutController {
    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService){
        this.workoutService = workoutService;
    }

    @GetMapping()
    public List<Workout> getWorkouts() {
        return workoutService.getWorkouts();
    }

    @PostMapping()
    public void registerNewWorkout(@RequestBody Workout workout){
        workoutService.addNewWorkout(workout);
    }

    @DeleteMapping(path = "{workoutYear}/{workoutDate}/{workoutName}")
    public void deleteWorkout(@PathVariable("workoutYear") String workoutYear, @PathVariable("workoutDate") String workoutDate, @PathVariable("workoutName") String workoutName){
        workoutService.deleteWorkout(workoutYear, workoutDate, workoutName);
    }


}
