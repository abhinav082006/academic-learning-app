const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  classLevel: {
    type: String,
    enum: ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    required: true
  },
  icon: { type: String, default: '📖' },
  color: { type: String, default: '#2ecc71' },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  totalQuizzes: { type: Number, default: 0 },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;