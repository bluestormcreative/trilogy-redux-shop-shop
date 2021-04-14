const mongoose = require('mongoose');
const STAGING_URI = require('./mongodb-client'); // local dev only

mongoose.connect(process.env.MONGODB_URI || STAGING_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
