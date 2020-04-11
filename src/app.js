const express = require('express');
const api = require('./routes/api');

const app = express();
const port = 3000;

app.use('/api', api);

app.listen(port, () => console.log(`app listening on port ${port}`));