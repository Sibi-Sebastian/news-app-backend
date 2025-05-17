const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { getAllNews,
  getNewsById } = require('../controllers/newsController'); // <-- Add this
const { verifyUser } = require('../middlewares/authUserMiddleware');

const { toggleLikeNews } = require('../controllers/likeController'); // or wherever you added it

// User Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyUser, getUserProfile);
router.put('/profile', verifyUser, updateUserProfile);

// News for Users (can add verifyUser if you want auth protected)
router.get('/news',verifyUser, getAllNews);  // Or: router.get('/news', verifyUser, getAllNews);
router.get('/news/:id', getNewsById); 

router.post('/news/:newsId/like', verifyUser, toggleLikeNews);

module.exports = router;
