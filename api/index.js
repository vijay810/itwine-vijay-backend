// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('../config/db');
// const errorHandler = require('../middlewares/error.middleware');  // Assuming you have this for error handling

// const app = express();

// /* -------------------- MIDDLEWARES -------------------- */
// app.use(cors());
// app.use(express.json());

// // Test route to check if server is working
// app.get('/', (req, res) => {
//    res.send('Server is working!');
// });

// /* -------------------- ROUTES -------------------- */
// app.use('/auth', require('../routes/auth.routes'));
// app.use('/leave', require('../routes/leave.routes'));  // Ensure these routes are correctly set up
// app.use('/clients', require('../routes/clients.routes'));  // Same here
// app.use('/user', require('../routes/user.routes'));  // Same for this one
// app.use('/news', require('../routes/news.routes'));  // Same here

// /* -------------------- ERROR HANDLER -------------------- */
// app.use(errorHandler);  // This middleware will handle errors globally

// const PORT = process.env.PORT || 4000;

// /* -------------------- START SERVER -------------------- */
// const startServer = async () => {
//    try {
//       await connectDB();
//       app.listen(PORT, () => {
//          console.log(`🚀 Server running on port ${PORT}`);
//       });
//    } catch (err) {
//       console.error('Failed to connect to the database', err);
//    }
// };

// startServer();
















require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const errorHandler = require('../middlewares/error.middleware');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('Server is working!'));

// Routes
app.use('/auth', require('../routes/auth.routes'));
app.use('/leave', require('../routes/leave.routes'));
app.use('/clients', require('../routes/clients.routes'));
app.use('/user', require('../routes/user.routes'));
app.use('/news', require('../routes/news.routes'));

// Error handler
app.use(errorHandler);

// Connect to MongoDB (reuse connection in serverless)
let isConnected = false;
const connectToDatabase = async () => {
   if (isConnected) return;
   const dbUrl = process.env.MONGO_URL;
   await connectDB(dbUrl);
   isConnected = true;
};
connectToDatabase();

// Export serverless handler for Vercel
module.exports = serverless(app);
