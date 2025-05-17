const User = require('../models/User');
const Comment = require('../models/Comment');
const News = require('../models/News');

// Add Comment (User)
exports.addComment = async (req, res) => {
  try {
    const { text, newsId } = req.body;

    const news = await News.findById(newsId);
    if (!news) return res.status(404).json({ message: 'News not found' });

    const comment = await Comment.create({
      text,
      news: newsId,
      user: req.user.id
    });

    // Add comment reference to user document
    await User.findByIdAndUpdate(req.user.id, {
      $push: { comments: comment._id }
    });

    res.status(201).json({ message: 'Comment added', comment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get User's Own Comments (with news title)
exports.getUserComments = async (req, res) => {
  try {
    const comments = await Comment.find({ user: req.user.id })
      .populate('news', 'title')
      .sort({ createdAt: -1 });

    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single comment by ID (only if it belongs to the logged-in user)
exports.getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findOne({ _id: commentId, user: req.user.id })
      .populate('news', 'title');

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    res.json({ comment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update User Comment (only own)
exports.updateComment = async (req, res) => {
  try {
    console.log('User ID:', req.user.id);
    console.log('Params:', req.params);
    console.log('Body:', req.body);

    const { commentId } = req.params;
    const { text } = req.body;

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, user: req.user.id },
      { text },
      { new: true }
    );

    if (!comment) {
      console.log('Comment not found or user unauthorized');
      return res.status(404).json({ message: 'Comment not found or unauthorized' });
    }

    res.json({ message: 'Comment updated', comment });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete User Comment (only own)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findOneAndDelete({ _id: commentId, user: req.user.id });

    if (!comment) return res.status(404).json({ message: 'Comment not found or unauthorized' });

    // Remove comment from user's comments array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { comments: commentId }
    });

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: View All Comments (with user email/mobile and news title)
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'email mobile')
      .populate('news', 'title')
      .sort({ createdAt: -1 });

    res.json({ total: comments.length, comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
