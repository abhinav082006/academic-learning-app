const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  classLevel: String,
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  questions: [{
    text: String,
    type: { type: String, enum: ['multipleChoice', 'fillInTheBlank', 'trueOrFalse', 'shortAnswer'] },
    options: [{ text: String, isCorrect: Boolean }],
    correctAnswer: String,
    explanation: String,
    points: { type: Number, default: 10 }
  }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  duration: { type: Number, default: 300 },
  passingScore: { type: Number, default: 70 },
  type: { type: String, enum: ['practice', 'challenge', 'assessment'], default: 'practice' },
  statistics: {
    timesAttempted: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;