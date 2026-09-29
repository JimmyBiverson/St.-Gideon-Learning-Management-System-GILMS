# Learning Management System (LMS)

A web-based Learning Management System designed to make online learning easier for students, instructors, and administrators.

The system provides separate dashboards and features for students, instructors, and administrators, allowing institutions to manage courses, learning content, users, enrollments, and learning activities from one platform.

## Features

### Student
- Create and manage an account
- Browse available courses
- Enroll in courses
- Access course content and lessons
- Track learning progress
- View enrolled courses
- Complete learning activities
- Receive certificates where applicable
- Manage personal profile

### Instructor
- Instructor dashboard
- Create and manage courses
- Add course lessons and learning materials
- Manage enrolled students
- Monitor student progress
- Update course information
- Manage course content

### Administrator
- Admin dashboard
- Manage students and instructors
- Manage courses and categories
- Monitor platform activities
- Manage users and permissions
- Manage enrollments
- Manage certificates
- Manage and maintain the overall LMS

## Technology Stack

- **Backend:** Laravel / PHP
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **UI:** Bootstrap / responsive web design
- **Authentication:** Laravel Authentication
- **API:** REST API support
- **Version Control:** Git & GitHub

## System Structure

The LMS is built around three main user roles:

```text
                    Learning Management System
                              |
          ---------------------------------------------
          |                     |                     |
       Student              Instructor              Admin
          |                     |                     |
       Courses              Courses               Users
       Lessons              Lessons               Courses
       Enrollment            Students              Enrollments
       Progress              Progress              Certificates
       Certificates          Management            System Settings
