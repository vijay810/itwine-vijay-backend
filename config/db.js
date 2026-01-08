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



// const mongoose = require('mongoose');

// let cached = global.mongoose;

// if (!cached) cached = global.mongoose = { conn: null, promise: null };

// const connectDB = async (mongoUrl) => {
//     if (cached.conn) return cached.conn;

//     if (!cached.promise) cached.promise = mongoose.connect(mongoUrl);

//     cached.conn = await cached.promise;
//     console.log('MongoDB connected');
//     return cached.conn;
// };

// module.exports = connectDB;














