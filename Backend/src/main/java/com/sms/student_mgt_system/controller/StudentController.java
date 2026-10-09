package com.sms.student_mgt_system.controller;

import com.sms.student_mgt_system.model.Student;
import com.sms.student_mgt_system.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController //every method's return value should be converted directly to JSON
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // GET /api/students  → list all
    @GetMapping
    public List<Student> getAll() {
        return studentService.getAllStudents();
    }

    // GET /api/students/5  → one student
    @GetMapping("/{id}")
    public Student getById(@PathVariable int id) {
        return studentService.getStudentById(id);
    }

    // POST /api/students  → create
    @PostMapping
    public ResponseEntity<Student> create(@Valid @RequestBody Student student) {
        Student saved = studentService.createStudent(student); //save and returns the student with the new id from MySQL
        return ResponseEntity
                .created(URI.create("/api/students/" + saved.getId()))   // 201 Created
                .body(saved);
    }

    // PUT /api/students/5  → update
    @PutMapping("/{id}")
    public Student update(@PathVariable int id, @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    // DELETE /api/students/5  → delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();   // 204 No Content:success, with an empty body.
    }
}
