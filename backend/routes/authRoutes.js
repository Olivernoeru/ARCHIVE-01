const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  getProfile, 
  updateProfile 
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

/**
 * Auth Routes
 * Base path: /api/auth
 */

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/me', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

module.exports = router;