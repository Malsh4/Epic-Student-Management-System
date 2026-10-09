-- =========================================
-- Student Management System - Database setup
-- Run this in MySQL Workbench
-- =========================================

CREATE DATABASE IF NOT EXISTS sms;
USE sms;

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(50)  NOT NULL,
    last_name       VARCHAR(50)  NOT NULL,
    email           VARCHAR(50)  NOT NULL UNIQUE,
    date_of_birth   DATE         NOT NULL,
    enrollment_date DATE         NOT NULL
);

-- Login users table
CREATE TABLE IF NOT EXISTS users (
    user_id  INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
);

-- Login user (password stored as plain text for this basic project)
INSERT INTO users (username, password) VALUES ('admin', 'admin123');

-- Sample students
INSERT INTO students (first_name, last_name, email, date_of_birth, enrollment_date)
VALUES ('Malsha', 'Amandi', 'malsha@gmail.com', '2003-01-12', '2021-01-01');

INSERT INTO students (first_name, last_name, email, date_of_birth, enrollment_date)
VALUES ('Meghana', 'Nuwanthi', 'meghana@gmail.com', '2002-07-22', '2021-01-01');