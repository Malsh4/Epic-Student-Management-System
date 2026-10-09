package com.sms.student_mgt_system.exception;

import java.time.LocalDateTime;
import java.util.Map;

public record ErrorResponse(
        LocalDateTime timestamp, //when the error happened
        int status, // HTTP status code such as 404
        String error, //standard name such as "not found"
        String message, // explanation such as "no student found with 99 id"
        Map<String, String> fieldErrors) { } //form fields are wrong and why its wrong