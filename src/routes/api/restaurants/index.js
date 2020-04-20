const express = require('express');
const { searchRestaurants,
    getRestaurants,
    getRandomRestaurant } = require('../../../logic/restaurants/restaurants-logic/restaurantsSearch');
const { addReview,
    addFavorite } = require('../../../logic/restaurants/restaurants-logic/restaurantInsert');

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

router.get('/addFavorite/:restaurantId/:dinerName', async (req, res) => {
    const isSuccess = await addFavorite(req);

    res.send(isSuccess);
});

router.post('/addReview/:restaurantId', async (req, res) => {
    const isSuccess = await addReview(req);

    res.send(isSuccess);
});

module.exports = router;
