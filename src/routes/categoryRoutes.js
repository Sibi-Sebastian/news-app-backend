const express = require('express');
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { verifyAdmin } = require('../middlewares/authMiddleware');

// Admin-only routes
router.post('/', verifyAdmin, addCategory);
router.get('/', getAllCategories); // Anyone can view
router.get('/:id', getCategoryById);
router.put('/:id', verifyAdmin, updateCategory);
router.delete('/:id', verifyAdmin, deleteCategory);

module.exports = router;
