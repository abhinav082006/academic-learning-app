const Subject = require('../models/Subject');
const Topic = require('../models/Topic');

// GET ALL SUBJECTS
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ isActive: true })
      .populate('topics')
      .sort({ name: 1 });
    res.status(200).json({
      count: subjects.length,
      subjects
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};

// GET SUBJECT BY ID
const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('topics');
    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.status(200).json({ subject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subject' });
  }
};

// GET SUBJECTS BY CLASS
const getSubjectsByClass = async (req, res) => {
  try {
    const { classLevel } = req.params;
    const subjects = await Subject.find({ classLevel, isActive: true })
      .populate('topics')
      .sort({ name: 1 });
    res.status(200).json({
      count: subjects.length,
      subjects
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};

// CREATE SUBJECT (Admin)
const createSubject = async (req, res) => {
  try {
    const { name, description, classLevel, icon, color, difficulty } = req.body;

    const subject = new Subject({
      name,
      description,
      classLevel,
      icon,
      color,
      difficulty
    });

    await subject.save();
    res.status(201).json({
      message: 'Subject created',
      subject
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subject' });
  }
};

// UPDATE SUBJECT (Admin)
const updateSubject = async (req, res) => {
  try {
    const { description, icon, color, difficulty, isActive, totalQuizzes, rating } = req.body;
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { description, icon, color, difficulty, isActive, totalQuizzes, rating, updatedAt: new Date() },
      { new: true }
    );
    res.status(200).json({
      message: 'Subject updated',
      subject
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subject' });
  }
};

// GET TOPICS BY SUBJECT
const getTopicsBySubject = async (req, res) => {
  try {
    const topics = await Topic.find({
      subject: req.params.subjectId,
      isActive: true
    }).sort({ order: 1 });
    res.status(200).json({
      count: topics.length,
      topics
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch topics' });
  }
};

module.exports = {
  getAllSubjects,
  getSubjectById,
  getSubjectsByClass,
  createSubject,
  updateSubject,
  getTopicsBySubject
};