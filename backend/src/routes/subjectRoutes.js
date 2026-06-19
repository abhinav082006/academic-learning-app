const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);
router.get('/class/:classLevel', subjectController.getSubjectsByClass);
router.get('/:subjectId/topics', subjectController.getTopicsBySubject);

// Admin routes (protected)
router.post('/', authenticate, subjectController.createSubject);
router.put('/:id', authenticate, subjectController.updateSubject);

module.exports = router;