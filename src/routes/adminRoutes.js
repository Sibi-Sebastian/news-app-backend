const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAllUsers,
  getAllComments
} = require('../controllers/adminController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

// Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile', verifyAdmin, getAdminProfile);
router.get('/users', verifyAdmin, getAllUsers);
router.get('/comments', verifyAdmin, getAllComments);

module.exports = router;
