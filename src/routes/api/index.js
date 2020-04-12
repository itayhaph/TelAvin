const express = require('express');
const restaurants = require('./restaurants');
const diners = require('./diners');

const router = express.Router();

router.get('/', (req, res) => { res.send('welcome to my site!!!') });

router.use('/restaurants', restaurants);
router.use('/diners', diners);

module.exports = router;
