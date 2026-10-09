package com.sms.student_mgt_system.service;

import com.sms.student_mgt_system.exception.DuplicateEmailException;
import com.sms.student_mgt_system.exception.StudentNotFoundException;
import com.sms.student_mgt_system.model.Student;
import com.sms.student_mgt_system.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //create one object/ bean of this class, so it can be injected into StudentController
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository; //passes in the StudentRepository bean
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(int id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
    }

    public Student createStudent(Student student) {
        validateDates(student); //enrollment isn't before birth
        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new DuplicateEmailException(student.getEmail());
        }
        student.setId(null);   // ignore any id the client sent, MySQL decides (AUTO_INCREMENT)
        return studentRepository.save(student);
    }

    public Student updateStudent(int id, Student student) {
        getStudentById(id);    // throws "not found" if the id doesn't exist
        validateDates(student);
        if (studentRepository.existsByEmailAndIdNot(student.getEmail(), id)) {
            throw new DuplicateEmailException(student.getEmail());
        }
        student.setId(id);     // the id in the URL
        studentRepository.update(student);
        return student;
    }

    public void deleteStudent(int id) {
        int rowsDeleted = studentRepository.deleteById(id);
        if (rowsDeleted == 0) {
            throw new StudentNotFoundException(id);
        }
    }

    // Date validation
    private void validateDates(Student student) {
        if (student.getEnrollmentDate().isBefore(student.getDateOfBirth())) {
            throw new IllegalArgumentException("Enrollment date cannot be before date of birth");
        }
    }
}