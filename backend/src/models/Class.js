const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    unique: true,
    required: true
  },
  displayName: String,
  level: { type: Number, unique: true },
  description: String,
  ageRange: { min: Number, max: Number },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  icon: { type: String, default: '📚' },
  color: { type: String, default: '#3498db' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;