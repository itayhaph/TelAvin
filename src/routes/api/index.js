const express = require('express');
const restaurants = require('./restaurants');

const router = express.Router();

router.get('/', (req, res) => { res.send('welcome to my site!!!') });

router.use('/restaurants', restaurants);

module.exports = router;
