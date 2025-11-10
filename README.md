# FlexiLearn - Adaptive Learning Platform

**FlexiLearn** is a full-stack adaptive learning platform designed for students to take practice and mandatory quizzes across multiple courses, track their progress, and get personalized results. The platform supports both students and instructors with role-based functionality, secure authentication, and real-time quiz evaluation.

---

## Problem Statement

Many students face challenges in assessing their understanding of subjects effectively. Traditional quizzes do not adapt to the learner's skill level and do not provide detailed feedback. **FlexiLearn** addresses this by offering:

- Adaptive quizzes that adjust difficulty based on performance.
- Immediate feedback and detailed analysis of quiz attempts.
- Secure tracking of student progress.
- Instructor tools to monitor student performance and add quiz content.

---

## Features

### Student Features
- Register/login with JWT authentication.
- Take **practice quizzes** with selectable difficulty.
- Take **mandatory quizzes** with adaptive difficulty logic.
- View **profile page** showing name, UID, and performance stats.
- View **quiz history** with detailed breakdown (questions, answers, correctness).

### Instructor Features
- View **all students** enrolled in courses.
- Track **quiz completion** and performance statistics.
- Add questions for **practice or mandatory quizzes**.

### Adaptive Quiz Logic
- Starts with **easy difficulty** questions.
- If the student answers correctly, difficulty increases; otherwise, it decreases.
- Quiz attempts are stored in MongoDB with timestamps and correctness flags.

### Security
- Passwords are **hashed using bcrypt**.
- JWT-based authentication protects routes.
- Role-based access ensures students and instructors access only allowed endpoints.
- Students cannot manipulate quiz results manually.

---

## Technologies Used

- **Frontend:** React, Vite, Axios, React Router,  CSS  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** JWT, bcrypt  
- **Database:** MongoDB

### Backend Setup
1. Navigate to the backend folder:
cd backend

npm install

node server.js


### FRONTEND SETUP
cd frontend

npm install

npm run dev



