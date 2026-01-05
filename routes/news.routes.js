const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');

router.post('/create-news', newsController.createNews);
router.get('/', newsController.getAllNews);
router.get('/get-active-data', newsController.getActiveNews);
router.get('/get-news/:id', newsController.getNewsById);
router.put('/update-news/:id', newsController.updateNews);
router.delete('/delete-news/:id', newsController.deleteNews);

module.exports = router;
