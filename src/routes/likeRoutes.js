const express = require('express');
const router = express.Router();
const { toggleLike } = require('../controllers/likeController');
const { verifyUser } = require('../middlewares/authUserMiddleware');

router.post('/:newsId', verifyUser, toggleLike);

module.exports = router;

