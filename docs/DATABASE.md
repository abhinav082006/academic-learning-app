# Database Schema

## Collections Overview

### User
- firstName, lastName, email, password
- class (Nursery-12)
- age, avatar
- learningStyle (visual, auditory, readingWriting, kinesthetic)
- statistics (totalXP, currentStreak, averageScore, etc.)
- timestamps

### Class
- name (Nursery-12, unique)
- displayName, level
- subjects array
- difficulty, icon, color

### Subject
- name, description
- classLevel
- topics array
- difficulty, rating
- totalQuizzes

### Quiz
- title, description
- subject, classLevel, topic
- questions array with options
- difficulty, duration, passingScore
- type (practice/challenge/assessment)

### UserProgress
- user reference
- subjectProgress array
- quizAttempts array
- gamification stats
- learningStyleAssessment
- analytics and recommendations

For detailed schema, see individual model files.