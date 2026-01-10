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










// const express = require('express');
// const cors = require('cors');
// const connectDB = require('../config/db');
// const errorHandler = require('../middlewares/error.middleware');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ---------------- DATABASE CONNECTION ----------------
// let dbConnected = false;
// const ensureDB = async () => {
//    if (!dbConnected) {
//       await connectDB(process.env.MONGO_URL);
//       dbConnected = true;
//    }
// };

// // ---------------- DB SAFE ROUTE LOADER ----------------
// function loadRoute(routePath) {
//    const router = require(routePath);
//    return async (req, res, next) => {
//       try {
//          await ensureDB();
//          router(req, res, next);  // Call the original router
//       } catch (err) {
//          next(err);
//       }
//    };
// }

// // ---------------- TEST ROUTE ----------------
// app.get('/', async (req, res, next) => {
//    try {
//       await ensureDB();
//       res.send('Server is working!');
//    } catch (err) {
//       next(err);
//    }
// });

// // ---------------- ROUTES ----------------
// // Use normal routers with DB-safe wrapper
// app.use('/auth', async (req, res, next) => {
//    try {
//       await ensureDB();
//       const authRouter = require('../routes/auth.routes');
//       authRouter(req, res, next);
//    } catch (err) {
//       next(err);
//    }
// });

// app.use('/leave', async (req, res, next) => {
//    try {
//       await ensureDB();
//       const leaveRouter = require('../routes/leave.routes');
//       leaveRouter(req, res, next);
//    } catch (err) {
//       next(err);
//    }
// });

// app.use('/clients', async (req, res, next) => {
//    try {
//       await ensureDB();
//       const clientsRouter = require('../routes/clients.routes');
//       clientsRouter(req, res, next);
//    } catch (err) {
//       next(err);
//    }
// });

// app.use('/user', async (req, res, next) => {
//    try {
//       await ensureDB();
//       const userRouter = require('../routes/user.routes');
//       userRouter(req, res, next);
//    } catch (err) {
//       next(err);
//    }
// });

// app.use('/news', async (req, res, next) => {
//    try {
//       await ensureDB();
//       const newsRouter = require('../routes/news.routes');
//       newsRouter(req, res, next);
//    } catch (err) {
//       next(err);
//    }
// });

// // ---------------- ERROR HANDLER ----------------
// app.use(errorHandler);

// module.exports = app;



// index.js
// require('dotenv').config(); // Load .env variables
// const express = require('express');
// const cors = require('cors');
// const errorHandler = require('../middlewares/error.middleware');

// // Routes
// const authRouter = require('../routes/auth.routes');
// const leaveRouter = require('../routes/leave.routes');
// const clientsRouter = require('../routes/clients.routes');
// const userRouter = require('../routes/user.routes');
// const newsRouter = require('../routes/news.routes');

// const app = express();

// // ---------------- MIDDLEWARES ----------------
// app.use(cors());
// app.use(express.json());

// // ---------------- TEST ROUTE ----------------
// app.get('/', (req, res) => res.send('Server is working!'));

// // ---------------- ROUTES ----------------
// app.use('/auth', authRouter);
// app.use('/leave', leaveRouter);
// app.use('/clients', clientsRouter);
// app.use('/user', userRouter);
// app.use('/news', newsRouter);

// // ---------------- ERROR HANDLER ----------------
// app.use(errorHandler);

// module.exports = app;


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const errorHandler = require('../middlewares/error.middleware');

const authRouter = require('../routes/auth.routes');
const leaveRouter = require('../routes/leave.routes');
const clientsRouter = require('../routes/clients.routes');
const userRouter = require('../routes/user.routes');
const newsRouter = require('../routes/news.routes');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 CONNECT DB ON EVERY REQUEST SAFELY
app.use(async (req, res, next) => {
  try {
    await connectDB(process.env.MONGO_URL);
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/', (req, res) => res.send('Server is working!'));

app.use('/auth', authRouter);
app.use('/leave', leaveRouter);
app.use('/clients', clientsRouter);
app.use('/user', userRouter);
app.use('/news', newsRouter);

app.use(errorHandler);

module.exports = app;
