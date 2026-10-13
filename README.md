# Student Management System

Full-stack CRUD application — React + Spring Boot + MySQL (JdbcTemplate, no JPA).

## Project structure
- `Backend/` — Spring Boot REST API (Controller → Service → Repository → JdbcTemplate)
- `Frontend/` — React (Vite) UI

## Features
- Database login (HTTP Basic Auth via Spring Security)
- Students: list, search by ID, create, edit, delete (with confirmation)
- Frontend and backend validation, global exception handling

## How to run

### 1. Database
Run `Backend/database/schema.sql` in MySQL Workbench.
Default login: **admin / admin123**

### 2. Backend (port 9090)
1. Open the `Backend` folder in IntelliJ.
2. Set environment variable `DB_PASSWORD` to your MySQL root password.
3. Run `StudentMgtSystemApplication`.

### 3. Frontend (port 5173)
```
cd Frontend
npm install
npm run dev
```
Open http://localhost:5173

## API endpoints (all require login)
| Method | URL | Description |
|---|---|---|
| GET | /api/auth/me | Check login |
| GET | /api/students | List students |
| GET | /api/students/{id} | Get one student |
| POST | /api/students | Create student |
| PUT | /api/students/{id} | Update student |
| DELETE | /api/students/{id} | Delete student |

## Notes
- Users are added manually in the database.
