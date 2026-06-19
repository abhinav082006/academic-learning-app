const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  icon: String,
  color: { type: String, default: '#FFD700' },
  category: {
    type: String,
    enum: ['achievement', 'streak', 'score', 'participation', 'challenge', 'learning_style'],
    required: true
  },
  criteria: {
    requiredQuizzesCount: Number,
    requiredStreakDays: Number,
    requiredAverageScore: Number,
    specificLearningStyle: String
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  reward: {
    xpBonus: { type: Number, default: 0 },
    streakBonus: { type: Number, default: 0 }
  },
  totalEarned: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Badge = mongoose.model('Badge', badgeSchema);
module.exports = Badge;