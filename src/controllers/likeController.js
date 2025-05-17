const User = require('../models/User');
const News = require('../models/News');

// Like or Unlike a news post
exports.toggleLikeNews = async (req, res) => {
  try {
    const userId = req.user.id;
    const newsId = req.params.newsId;

    const news = await News.findById(newsId);
    if (!news) return res.status(404).json({ message: 'News not found' });

    const user = await User.findById(userId);

    const alreadyLiked = user.likedNews.includes(newsId);

    if (alreadyLiked) {
      // Unlike
      user.likedNews.pull(newsId);
      await user.save();
      return res.json({ message: 'News unliked' });
    } else {
      // Like
      user.likedNews.push(newsId);
      await user.save();
      return res.json({ message: 'News liked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
