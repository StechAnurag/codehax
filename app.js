const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const apiRouter = require('./routes/api.routes');
require('./firebase.config');
const app = express();

// Enable Cors
app.use(cors());
app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// set Security HTTP headers
app.use(helmet());

// Logging
app.use(morgan('dev'));

// Limit requests from same IP
const limiter = rateLimit({
  max: 5, // 5 requests per IP
  windowMs: 10 * 60 * 1000, // Block for 10 mins
  message: 'Too Many Requests from the IP, please try again after 10 minutes'
});
app.use('/api', limiter); // only protect APIs routes

// Body Parser
app.use(express.json({ limit: '10Kb' }));
app.use(express.urlencoded({ extended: true, limit: '10Kb' }));

// Data sanitization against XSS
app.use(xss());

// 2) ROUTES
app.use('/api/v1/', apiRouter);

// 404 - NOT FOUND ROUTE
app.all('*', (req, res, next) => {
  return res.json({ status: 'failed', code: 404, message: 'Requested route not found' });
});

// GLOBAL ERROR HANDLING Middlware
app.use((err, req, res, next) => {
  if (err) {
    return res.json({ status: 'error', code: 500, message: 'Something went wrong' });
  }
  res.json({ status: 'success', code: 200, data: {}, message: 'Hello there!' });
});

module.exports = app;
