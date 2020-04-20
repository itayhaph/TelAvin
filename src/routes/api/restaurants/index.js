const express = require('express');
const restaurantAdd = require('./add');
const { searchRestaurants,
    getRestaurants,
    getRandomRestaurant } = require('../../../logic/restaurants/restaurants-logic/restaurantsSearch');

const router = express.Router();

router.use('/add', restaurantAdd);

router.get('/', async (req, res) => {
    const restaurants = await getRestaurants(req);

    res.send(restaurants);
});

router.get('/search', async (req, res) => {
    const restaurants = await searchRestaurants(req);

    res.send(restaurants);
});

router.get('/random', async (req, res) => {
    const restaurant = await getRandomRestaurant();

    res.send(restaurant);
});

module.exports = router;
