// ENV initialization
require('dotenv').config();

// Mongoose Models
require('./models/User');
require('./models/Track');

const 
    express = require('express'),
    bodyParser = require('body-parser'),
    authRoutes = require('./routes/authRoutes'),
    trackRoutes = require('./routes/trackRoutes'),
    requireAuth = require('./middlewares/requireAuth'),
    app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

require('./db');

app.get('/', requireAuth, (req, res) => {
    res.send(`Hi there ${req.user.email}!`)
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});