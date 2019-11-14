require('dotenv').config();

const express = require('express');
const app = express();

require('../db');

app.get('/', (req, res) => {
    res.send('Hi there!')
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});