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
















// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('../config/db');
// const errorHandler = require('../middlewares/error.middleware');
// const serverless = require('serverless-http');

// const app = express();

// // ---------------- MIDDLEWARES ----------------
// app.use(cors());
// app.use(express.json());

// // ---------------- TEST ROUTE ----------------
// app.get('/', (req, res) => res.send('Server is working!'));

// // ---------------- ROUTES ----------------
// // Uncomment or comment the routes as needed
// app.use('/auth', require('../routes/auth.routes'));
// app.use('/leave', require('../routes/leave.routes'));
// app.use('/clients', require('../routes/clients.routes'));
// app.use('/user', require('../routes/user.routes'));
// app.use('/news', require('../routes/news.routes'));

// // ---------------- ERROR HANDLER ----------------
// app.use(errorHandler);

// // ---------------- DATABASE CONNECTION ----------------
// let isConnected = false; // track connection for serverless
// const connectToDatabase = async () => {
//    if (isConnected) return; // reuse connection
//    const dbUrl = process.env.MONGO_URL;
//    await connectDB(dbUrl);
//    isConnected = true;
// };
// connectToDatabase();

// // ---------------- EXPORT / START SERVER ----------------
// if (process.env.VERCEL) {
//    // Serverless for Vercel
//    module.exports = serverless(app);
// } else {
//    // Local development
//    const PORT = process.env.PORT || 4000;
//    app.listen(PORT, () => {
//       console.log(`🚀 Server running locally on port ${PORT}`);
//    });
// }





// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('../config/db');
// const errorHandler = require('../middlewares/error.middleware');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Test route
// app.get('/', (req, res) => res.send('Server is working!'));

// // Routes
// app.use('/auth', require('../routes/auth.routes'));
// app.use('/leave', require('../routes/leave.routes'));
// app.use('/clients', require('../routes/clients.routes'));
// app.use('/user', require('../routes/user.routes'));
// app.use('/news', require('../routes/news.routes'));

// // Error handler
// app.use(errorHandler);

// // ---------------- DATABASE CONNECTION ----------------
// let dbConnected = false;
// const connectToDatabase = async () => {
//    if (dbConnected) return;
//    try {
//       await connectDB(process.env.MONGO_URL);
//       dbConnected = true;
//    } catch (err) {
//       console.error('MongoDB connection error', err);
//       throw err; // Important for Vercel to see
//    }
// };

//    connectToDatabase().then(() => {
//       const PORT = process.env.PORT || 4000;
//       app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
//    });










const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const errorHandler = require('../middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// ---------------- DATABASE CONNECTION ----------------
let dbConnected = false;

async function ensureDB() {
   if (!dbConnected) {
      await connectDB(process.env.MONGO_URL);
      dbConnected = true;
   }
}

// ---------------- SERVERLESS SAFE ROUTE LOADER ----------------
function serverlessRoute(routePath) {
   return async (req, res, next) => {
      try {
         await ensureDB();
         const route = require(routePath); // require here to ensure DB is ready
         return route(req, res, next);
      } catch (err) {
         next(err);
      }
   };
}

// ---------------- TEST ROUTE ----------------
app.get('/', async (req, res, next) => {
   try {
      await ensureDB();
      res.send('Server is working!');
   } catch (err) {
      next(err);
   }
});

// ---------------- ROUTES ----------------
// Wrap routes with DB loader
app.use('/auth', serverlessRoute('../routes/auth.routes'));
app.use('/leave', serverlessRoute('../routes/leave.routes'));
app.use('/clients', serverlessRoute('../routes/clients.routes'));
app.use('/user', serverlessRoute('../routes/user.routes'));
app.use('/news', serverlessRoute('../routes/news.routes'));

// ---------------- ERROR HANDLER ----------------
app.use(errorHandler);

// ---------------- EXPORT APP FOR VERCEL ----------------
module.exports = app;


