const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mymusic',
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false

  // useCreateIndex: true,
}
);

module.exports = mongoose.connection;
