const express = require('express');
const dinerAdd = require('./add');
const { getDiner } = require('../../../logic/diners/diners-logic/dinerSearch');
const { deleteFavorite } = require('../../../logic/diners/diners-logic/dinerDelete');

const router = express.Router();

router.use('/add', dinerAdd);

router.get('/getDiner/:dinerName', async (req, res) => {
    const diner = await getDiner(req);

    res.send(diner);
});

router.delete('/deleteFavorite/:dinerName/:restaurantId', async (req, res) => {
    const isSuccess = await deleteFavorite(req);

    res.send(isSuccess);
});

module.exports = router;
