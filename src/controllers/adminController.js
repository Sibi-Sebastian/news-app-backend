const Admin = require('../models/Admin');
const User = require('../models/User');
const Comment = require('../models/Comment');
const News = require('../models/News');

const jwt = require('jsonwebtoken');
const { validateAdminInput } = require('../utils/validator');

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  const { isValid, errors } = validateAdminInput({ email, password });
  if (!isValid) return res.status(400).json({ errors });

  const existing = await Admin.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Admin already exists' });

  const admin = await Admin.create({ email, password });
  res.status(201).json({
    message: 'Admin registered successfully',
    token: generateToken(admin._id),
  });
};

// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const { isValid, errors } = validateAdminInput({ email, password });
  if (!isValid) return res.status(400).json({ errors });

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({
    message: 'Login successful',
    token: generateToken(admin._id),
  });
};

// Protected route example
exports.getAdminProfile = async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-password');
  res.json(admin);
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (!users.length) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'email mobile')
      .populate('news', 'title');

    if (!comments.length) {
      return res.status(404).json({ message: 'No comments found' });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
