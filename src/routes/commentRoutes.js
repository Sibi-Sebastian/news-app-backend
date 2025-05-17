const express = require('express');
const router = express.Router();
const {
  addComment,
  getUserComments,
  updateComment,
  deleteComment,
  getAllComments,
  getCommentById
} = require('../controllers/commentController');

const { verifyUser } = require('../middlewares/authUserMiddleware');
const { verifyAdmin } = require('../middlewares/authMiddleware');

// USER routes
router.post('/', verifyUser, addComment);                     // POST /api/comments
router.get('/', verifyUser, getUserComments);                 // GET /api/comments

// Get a specific comment by ID (only for logged-in user)
router.get('/:commentId', verifyUser, getCommentById);        // GET /api/comments/:commentId

router.put('/:commentId', verifyUser, updateComment);         // PUT /api/comments/:commentId
router.delete('/:commentId', verifyUser, deleteComment);      // DELETE /api/comments/:commentId

// ADMIN route
router.get('/admin/all', verifyAdmin, getAllComments);        // GET /api/comments/admin/all

module.exports = router;
