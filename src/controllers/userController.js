const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ email, mobile, password });
    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

//get user profile

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'likedNews',
        select: 'title imageUrl category createdAt', // only show useful fields
        populate: { path: 'category', select: 'name' } // also get category name
      })
      .populate({
        path: 'comments',
        select: 'text news', // only relevant comment fields
        populate: {
          path: 'news',
          select: 'title imageUrl' // show news details with each comment
        }
      });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      email: user.email,
      mobile: user.mobile,
      likedNews: user.likedNews,
      comments: user.comments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Update User Info (email/mobile/password)
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { email, mobile, password } = req.body;

    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (password) user.password = password;

    await user.save();
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};
