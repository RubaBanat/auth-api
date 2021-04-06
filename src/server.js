'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500');
const notFoundHandler = require('./error-handlers/404');
const authRoutes = require('./auth/middleware/routes');
const logger = require('./api/middleware/logger');
const v1Routes = require('./api/routes/v1');
const v2Routes = require('./api/routes/v2');


// Prepare the express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(logger);


// Routes
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.use(authRoutes);

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start : (port)=>{
      const PORT = port ;
      app.listen(PORT , ()=> console.log(`LISTENING ON PORT ${PORT}`));
  },
};
