const News = require('../models/News');
const Category = require('../models/Category');

// Add News (Admin Only)
exports.addNews = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const imageUrl = req.file?.path;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(400).json({ message: 'Invalid category' });

    const news = await News.create({
      title,
      body,
      imageUrl,
      category,
      createdBy: req.admin.id,
    });

    res.status(201).json({ message: 'News created', news });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get All News (pagination, search, filter)
exports.getAllNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category } = req.query;
    const query = {
      ...(search && { title: { $regex: search, $options: 'i' } }),
      ...(category && { category }),
    };

    const news = await News.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await News.countDocuments(query);
    res.json({ total, page: +page, news });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Single News
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('category', 'name');
    if (!news) return res.status(404).json({ message: 'News not found' });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update News (Admin Only)
exports.updateNews = async (req, res) => {
  try {
    const { title, body, category } = req.body;
    const imageUrl = req.file?.path;

    const updateData = { title, body, category };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const news = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!news) return res.status(404).json({ message: 'News not found' });

    res.json({ message: 'News updated', news });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete News (Admin Only)
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });

    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
