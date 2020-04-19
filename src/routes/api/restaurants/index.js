const express = require('express');
const { searchRestaurants, getRestaurants, getRandomRestaurant, addReview } = require('../../../logic/restaurants/restaurantLogic');

const router = express.Router();

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

router.post('/addReview/:restaurantId', async (req, res) => {
    const isSuccess = await addReview(req);

    res.send(isSuccess);
});

module.exports = router;
