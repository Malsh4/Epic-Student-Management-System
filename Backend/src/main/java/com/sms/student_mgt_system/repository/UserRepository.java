package com.sms.student_mgt_system.repository;

import com.sms.student_mgt_system.model.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // Used at login ( find the user by username)
    public Optional<User> findByUsername(String username) {
        List<User> users = jdbcTemplate.query(
                "SELECT user_id, username, password FROM users WHERE username = ?",
                (rs, rowNum) -> new User(
                        rs.getInt("user_id"),
                        rs.getString("username"),
                        rs.getString("password")),
                username);
        return users.stream().findFirst();
    }
}