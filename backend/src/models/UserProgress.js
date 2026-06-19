const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  class: String,
  subjectProgress: [{
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    topicsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
    quizzesAttempted: { type: Number, default: 0 },
    quizzesCompleted: { type: Number, default: 0 },
    quizzesPassed: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    totalXPEarned: { type: Number, default: 0 },
    masteryLevel: { type: String, enum: ['beginner', 'developing', 'proficient', 'advanced'], default: 'beginner' }
  }],
  quizAttempts: [{
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    score: Number,
    isPassed: Boolean,
    timeTaken: Number,
    completedAt: { type: Date, default: Date.now }
  }],
  gamification: {
    totalXP: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
    level: { type: Number, default: 1 }
  },
  learningStyleAssessment: {
    visual: { type: Number, default: 0 },
    auditory: { type: Number, default: 0 },
    readingWriting: { type: Number, default: 0 },
    kinesthetic: { type: Number, default: 0 },
    dominantStyle: { type: String, default: 'unassessed' },
    isComplete: { type: Boolean, default: false }
  },
  analytics: {
    strongAreas: [String],
    weakAreas: [String],
    recommendedTopics: [{
      topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
      reason: String,
      priority: { type: String, enum: ['high', 'medium', 'low'] }
    }],
    recommendedLearningStyle: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);
module.exports = UserProgress;