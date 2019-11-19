require('dotenv').config();
require('./models/User');

const 
    express = require('express'),
    bodyParser = require('body-parser'),
    authRoutes = require('./routes/authRoutes'),
    requireAuth = require('./middlewares/requireAuth'),
    app = express();

app.use(bodyParser.json());
app.use(authRoutes);

require('./db');

app.get('/', requireAuth, (req, res) => {
    res.send(`Hi there ${req.user.email}!`)
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});