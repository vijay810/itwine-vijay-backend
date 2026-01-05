const newsService = require('../services/news.service');

const newsController = {

    createNews: async (req, res, next) => {
        try {
            const news = await newsService.createNews(req.body);
            res.status(201).json({
                data: news,
                message: 'News added successfully!',
                status: 200
            });
        } catch (err) {
            next(err);
        }
    },

    getAllNews: async (req, res, next) => {
        try {
            const newsList = await newsService.getAllNews();
            res.json({
                data: newsList,
                message: 'All news fetched successfully.',
                status: 200
            });
        } catch (err) {
            next(err);
        }
    },

    getActiveNews: async (req, res, next) => {
        try {
            const activeNews = await newsService.getActiveNews();
            res.json({
                data: activeNews,
                message: 'Active news fetched successfully.',
                status: 200
            });
        } catch (err) {
            next(err);
        }
    },

    getNewsById: async (req, res, next) => {
        try {
            const news = await newsService.getNewsById(req.params.id);
            res.json({
                data: news,
                message: 'News fetched successfully.',
                status: 200
            });
        } catch (err) {
            res.status(404).json({ message: err.message, status: 404 });
        }
    },

    updateNews: async (req, res, next) => {
        try {
            const updatedNews = await newsService.updateNews(req.params.id, req.body);
            res.json({
                data: updatedNews,
                message: 'News updated successfully.',
                status: 200
            });
        } catch (err) {
            res.status(404).json({ message: err.message, status: 404 });
        }
    },

    deleteNews: async (req, res, next) => {
        try {
            await newsService.deleteNews(req.params.id);
            res.json({
                message: 'News deleted successfully.',
                status: 200
            });
        } catch (err) {
            res.status(404).json({ message: err.message, status: 404 });
        }
    }
};

module.exports = newsController;
