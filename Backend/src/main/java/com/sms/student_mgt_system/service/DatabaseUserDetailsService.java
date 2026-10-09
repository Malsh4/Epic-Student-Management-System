package com.sms.student_mgt_system.service;

import com.sms.student_mgt_system.model.User;
import com.sms.student_mgt_system.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
//bridge between Spring Security and your MySQL users table.
@Service
public class DatabaseUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public DatabaseUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find user in the db
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // Convert it to SPRING's User
        return org.springframework.security.core.userdetails.User
                .withUsername(user.username())
                .password(user.password())
                .roles("USER")
                .build();
    }
}