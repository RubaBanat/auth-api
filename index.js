'use strict';

const server = require('./src/server');
require('dotenv').config();

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
.connect(process.env.MONGODB_URI, options)
.then(() => { server.start(process.env.PORT)
})
.catch(e => console.error('Could not start server', e.message));
