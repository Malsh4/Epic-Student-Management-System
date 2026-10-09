package com.sms.student_mgt_system.repository;

import org.springframework.stereotype.Repository;
import com.sms.student_mgt_system.model.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
@Repository
public class StudentRepository {
    private static final String SELECT_COLUMNS =
            "SELECT id, first_name, last_name, email, date_of_birth, enrollment_date FROM students";

    // one db row -> one student java object
    private static final RowMapper<Student> STUDENT_ROW_MAPPER = (rs, rowNum) -> {
        //(rs -current row from MySQL, rowNum - no use,but part of the required signature)
        Student s = new Student();
        s.setId(rs.getInt("id"));
        s.setFirstName(rs.getString("first_name"));
        s.setLastName(rs.getString("last_name"));
        s.setEmail(rs.getString("email"));
        s.setDateOfBirth(rs.getObject("date_of_birth", LocalDate.class)); //converts the MySQL DATE directly into a Java LocalDate
        s.setEnrollmentDate(rs.getObject("enrollment_date", LocalDate.class));
        return s;
    };

    private final JdbcTemplate jdbcTemplate;

    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // read all
    public List<Student> findAll() {
        return jdbcTemplate.query(SELECT_COLUMNS + " ORDER BY id", STUDENT_ROW_MAPPER);
    }

    // read one
    public Optional<Student> findById(int id) { // optional - force the caller to handle the "not found"
        List<Student> result = jdbcTemplate.query(SELECT_COLUMNS + " WHERE id = ?", STUDENT_ROW_MAPPER, id); // ? - id value at the end of the call is filled in safely by JDBC
        return result.stream().findFirst();
    }

    // unique email or not - create
    public boolean existsByEmail(String email) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM students WHERE email = ?", Integer.class, email); //Integer.class - tells JdbcTemplate what type to convert the result
        return count != null && count > 0;
    }

    // unique email or not - update
    public boolean existsByEmailAndIdNot(String email, int id) {
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM students WHERE email = ? AND id <> ?", Integer.class, email, id);
        return count != null && count > 0;
    }

    // create
    public Student save(Student student) {
        String sql = "INSERT INTO students (first_name, last_name, email, date_of_birth, enrollment_date) "
                + "VALUES (?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder(); //an empty container that will catch the id MySQL generates

        jdbcTemplate.update(connection -> {
            //update() is used for INSERT, UPDATE and DELETE meaning any SQL changes data
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, student.getFirstName());
            ps.setString(2, student.getLastName());
            ps.setString(3, student.getEmail());
            ps.setObject(4, student.getDateOfBirth());
            ps.setObject(5, student.getEnrollmentDate());
            return ps;
        }, keyHolder);

        student.setId(Objects.requireNonNull(keyHolder.getKey()).intValue()); //takes the new id from the KeyHolder, puts it into the student object and returns it.
        return student;
    }

    // update
    public int update(Student student) { //int: the number of rows changed
        return jdbcTemplate.update(
                "UPDATE students SET first_name = ?, last_name = ?, email = ?, date_of_birth = ?, enrollment_date = ? "
                        + "WHERE id = ?",
                student.getFirstName(), student.getLastName(), student.getEmail(),
                student.getDateOfBirth(), student.getEnrollmentDate(), student.getId());
    }

    // delete
    public int deleteById(int id) {
        return jdbcTemplate.update("DELETE FROM students WHERE id = ?", id);
    }
}
