const Class = require('../models/Class');
const Subject = require('../models/Subject');

// GET ALL CLASSES
const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({ isActive: true })
      .populate('subjects')
      .sort({ level: 1 });
    res.status(200).json({
      count: classes.length,
      classes
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};

// GET CLASS BY ID
const getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate('subjects');
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.status(200).json({ class: classData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch class' });
  }
};

// CREATE CLASS (Admin)
const createClass = async (req, res) => {
  try {
    const { name, displayName, level, description, ageRange, difficulty, icon, color } = req.body;

    const classData = new Class({
      name,
      displayName,
      level,
      description,
      ageRange,
      difficulty,
      icon,
      color
    });

    await classData.save();
    res.status(201).json({
      message: 'Class created',
      class: classData
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class' });
  }
};

// UPDATE CLASS (Admin)
const updateClass = async (req, res) => {
  try {
    const { displayName, description, difficulty, icon, color, isActive } = req.body;
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      { displayName, description, difficulty, icon, color, isActive, updatedAt: new Date() },
      { new: true }
    );
    res.status(200).json({
      message: 'Class updated',
      class: classData
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update class' });
  }
};

// GET SUBJECTS BY CLASS
const getSubjectsByClass = async (req, res) => {
  try {
    const subjects = await Subject.find({
      classLevel: req.params.classLevel,
      isActive: true
    }).sort({ name: 1 });
    res.status(200).json({
      count: subjects.length,
      subjects
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  getSubjectsByClass
};