package com.sms.student_mgt_system.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
//to check whether a username and password are correct.
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // If the username anf password are correct → 200 + username.
    // If wrong → Spring Security already returns 401 before reaching here.
    @GetMapping("/me") //about the currently logged-in user
    public Map<String, String> me(Authentication authentication) {
        return Map.of("username", authentication.getName());
    }
}