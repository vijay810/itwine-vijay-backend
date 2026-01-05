const News = require('../models/News.model');

const newsService = {

    // CREATE news
    async createNews(data) {
        const newNews = await News.create(data);
        return newNews;
    },

    // GET all news
    async getAllNews() {
        return await News.find().sort({ _id: -1 });
    },

    // GET active news only
    async getActiveNews() {
        return await News.find({ status: 1 }).sort({ _id: -1 });
    },

    // GET single news by ID
    async getNewsById(id) {
        const news = await News.findById(id);
        if (!news) throw new Error('News not found');
        return news;
    },

    // UPDATE news
    async updateNews(id, data) {
        const updatedNews = await News.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if (!updatedNews) throw new Error('News not found');
        return updatedNews;
    },

    // DELETE news
    async deleteNews(id) {
        const deleted = await News.findByIdAndDelete(id);
        if (!deleted) throw new Error('News not found');
        return deleted;
    }
};

module.exports = newsService;
