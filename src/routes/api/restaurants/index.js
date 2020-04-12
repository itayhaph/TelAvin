const express = require('express');
const { searchRestaurants, getRestaurants } = require('../../../logic/restaurants/restaurantLogic');

const router = express.Router();

router.get('/', async (req, res) => {
    const restaurants = await getRestaurants(req);

    res.send(restaurants);
});

router.get('/search', async (req, res) => {
    const restaurants = await searchRestaurants(req);

    res.send(restaurants);
});

module.exports = router;
