const 
    mongoose = require('mongoose'),
    keys = require('../config/keys');

mongoose.connect(keys.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection
    .on('connected', () => console.log('Connected to mongo instance'))
    .on('error', err => console.log('Error connecting to mLab', err));

module.exports = mongoose;