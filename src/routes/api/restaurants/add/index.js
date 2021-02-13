const express = require('express');
const { addReview,
    addFavorite } = require('../../../../services/restaurants/restaurants-logic/restaurantInsert');

const router = express.Router();

router.get('/favorite/:restaurantId/:dinerName', async (req, res) => {
    const isSuccess = await addFavorite(req);

    res.send(isSuccess);
});

router.post('/review/:restaurantId', async (req, res) => {
    const isSuccess = await addReview(req);

    res.send(isSuccess);
});

module.exports = router;
