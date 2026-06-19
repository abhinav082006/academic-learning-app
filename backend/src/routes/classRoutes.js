const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.get('/:classLevel/subjects', classController.getSubjectsByClass);

// Admin routes (protected)
router.post('/', authenticate, classController.createClass);
router.put('/:id', authenticate, classController.updateClass);

module.exports = router;