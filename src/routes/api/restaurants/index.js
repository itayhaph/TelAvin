const express = require('express');
const { searchRestaurants, testFirstMongoInsert } = require('../../../logic/restaurants/restaurantLogic');

const router = express.Router();

router.get('/', (req, res) => {
    const restaurants = searchRestaurants(req);

    console.log(restaurants, 'index');
    res.send(restaurants);
});

router.get('/mongoTest', async (req, res) => {
    res.send(await testFirstMongoInsert());
});

module.exports = router;
