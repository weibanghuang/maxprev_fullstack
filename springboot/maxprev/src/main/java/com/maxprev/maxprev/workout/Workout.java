package com.maxprev.maxprev.workout;

import jakarta.persistence.*;

@Entity
@Table
public class Workout {
    @Id
    @SequenceGenerator(
            name = "workout_sequence",
            sequenceName = "workout_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "workout_sequence"
    )

    private Long id;
    private String year;
    private String date;
    private String name;
    private Long rep;
    private Long weight;

    public Workout() {
    }

    public Workout(Long id, String year, String date, String name, Long rep, Long weight) {
        this.id = id;
        this.year = year;
        this.date = date;
        this.name = name;
        this.rep = rep;
        this.weight = weight;
    }

    public Workout(String year, String date, String name, Long rep, Long weight) {
        this.year = year;
        this.date = date;
        this.name = name;
        this.rep = rep;
        this.weight = weight;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getRep() {
        return rep;
    }

    public void setRep(Long rep) {
        this.rep = rep;
    }

    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "Workout{" +
                "id=" + id +
                ", year=" + year +
                ", date=" + date +
                ", name='" + name + '\'' +
                ", rep=" + rep +
                ", weight=" + weight +
                '}';
    }
}
