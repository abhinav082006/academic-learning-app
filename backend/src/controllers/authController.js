const User = require('../models/User');
const UserProgress = require('../models/UserProgress');
const { generateToken } = require('../utils/tokenGenerator');
const { validateEmail, validatePassword, validateClass, validateAge } = require('../utils/validators');

// SIGNUP
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, class: classLevel, age } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !classLevel) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (!validateClass(classLevel)) {
      return res.status(400).json({ error: 'Invalid class' });
    }

    if (age && !validateAge(age)) {
      return res.status(400).json({ error: 'Age must be between 3 and 25' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      class: classLevel,
      age
    });

    await user.save();

    // Create user progress record
    const userProgress = new UserProgress({
      user: user._id,
      class: classLevel
    });
    await userProgress.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        class: user.class,
        age: user.age
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        class: user.class,
        age: user.age,
        statistics: user.statistics
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        class: user.class,
        age: user.age,
        avatar: user.avatar,
        statistics: user.statistics,
        learningStyle: user.learningStyle
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, age, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, age, avatar, updatedAt: new Date() },
      { new: true }
    );
    res.status(200).json({
      message: 'Profile updated',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser,
  updateProfile
};