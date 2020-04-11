const express = require('express');
const { searchRestaurants } = require('../../../logic/restaurants/restaurantLogic');

const router = express.Router();

router.get('/', async (req, res) => {
    const restaurants = await searchRestaurants(req);
    res.send(restaurants);
});

module.exports = router;
