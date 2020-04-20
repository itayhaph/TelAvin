const express = require('express');
const { addFavorite, addReview } = require('../../../../logic/diners/diners-logic/dinerInsert');

const router = express.Router();

router.get('/favorite/:dinerName/:restaurantId', async (req, res) => {
    const isSuccess = await addFavorite(req);

    res.send(isSuccess);
});

router.post('/review/:dinerName', async (req, res) => {
    const isSuccess = await addReview(req);
    res.send(isSuccess);
});

module.exports = router;