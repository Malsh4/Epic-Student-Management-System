package com.sms.student_mgt_system.exception;

public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(int id) {
        super("Student with id " + id + " was not found"); //calls the constructor of the parent class. so , i don't write getMessage()
    }
}