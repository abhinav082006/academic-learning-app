const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  classLevel: String,
  order: { type: Number, default: 0 },
  content: {
    summary: String,
    resources: [{
      type: String,
      title: String,
      url: String,
      resourceType: { type: String, enum: ['video', 'article', 'image', 'interactive'] }
    }],
    learningObjectives: [String]
  },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  estimatedTime: { type: Number, default: 30 },
  tags: [String],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;