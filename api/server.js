require('dotenv').config();
const app = require('./index'); // correct relative path
const connectDB = require('../config/db'); // correct relative path

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        // console.log('✅ MongoDB connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running locally on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server', err);
        process.exit(1);
    }
};

startServer();
