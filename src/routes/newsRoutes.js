const express = require('express');
const router = express.Router();
const {
  addNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { verifyAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Public
router.get('/', getAllNews);
router.get('/:id', getNewsById);

// Admin Only
router.post('/', verifyAdmin, upload.single('image'), addNews);
router.put('/:id', verifyAdmin, upload.single('image'), updateNews);
router.delete('/:id', verifyAdmin, deleteNews);

module.exports = router;
