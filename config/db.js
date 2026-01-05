// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.MONGO_URL);
//         console.log(`Connected to Mongo! Database name: "${connection.connections[0].name}"`);
//     } catch (err) {
//         console.error('Error connecting to mongo', err.message);
//         process.exit(1); // Exit process with failure
//     }
// };

// module.exports = connectDB;



// config/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         // Remove deprecated options
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log('✅ MongoDB connected');
//     } catch (err) {
//         console.error('MongoDB connection failed', err);
//         process.exit(1);  // Exit process with failure
//     }
// };

// module.exports = connectDB;









// config/db.js
const mongoose = require('mongoose');

const connectDB = async (mongoUrl) => {
    try {
        // Connect to MongoDB without deprecated options
        await mongoose.connect(mongoUrl);
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection failed', err);
        process.exit(1);  // Exit process with failure
    }
};

module.exports = connectDB;







