const express = require('express');
const { insertDiner, getDiner, addReview, addFavorite } = require('../../../logic/diners/dinersLogic');

const router = express.Router();

router.get('/', async (req, res) => {
    // await insertDiner();
    res.send('doesnt do anything for now');
});

router.get('/getDiner/:dinerName', async (req, res) => {
    const diner = await getDiner(req);

    res.send(diner);
});

router.get('/addFavorite/:dinerName/:restaurantId', async (req, res) => {
    const isSuccess = await addFavorite(req);

    res.send(isSuccess);
});

router.post('/addReview/:dinerName', async (req, res) => {
    const isSuccess = await addReview(req);
    res.send(isSuccess);
});

module.exports = router;
