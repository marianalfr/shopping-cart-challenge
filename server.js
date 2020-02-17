const express = require('express');
const promoCodes = require('./data/promoCodes');
const app = express();

app.get('/api', (req, res) => {
    res.json(promoCodes)
});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));