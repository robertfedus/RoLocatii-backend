const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const placesRouter = require('./routes/placesRoutes');
const authRouter = require('./routes/authRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const favouriteRouter = require('./routes/favouriteRoutes');

const app = express();
app.use(express.json());
app.use(morgan());
app.use(cors());
app.use('/api/v1/places', placesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/favourite', favouriteRouter);

module.exports = app;
