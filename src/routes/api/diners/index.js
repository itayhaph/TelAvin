const express = require('express');
const { getDiner } = require('../../../logic/diners/diners-logic/dinerSearch');
const { insertDiner, addFavorite, addReview } = require('../../../logic/diners/diners-logic/dinerInsert');
const { deleteFavorite } = require('../../../logic/diners/diners-logic/dinerDelete');

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

router.delete('/deleteFavorite/:dinerName/:restaurantId', async (req, res) => {
    const isSuccess = await deleteFavorite(req);

    res.send(isSuccess);
});

module.exports = router;
