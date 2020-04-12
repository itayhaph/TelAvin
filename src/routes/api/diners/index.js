const express = require('express');
const { insertDiner, getDiner } = require('../../../logic/diners/dinersLogic');

const router = express.Router();

router.get('/', async (req, res) => {
    // await insertDiner();
    res.send('doesnt do anything for now');
});

router.get('/:dinerName', async (req, res) => {
    const diner = await getDiner(req);

    res.send(diner);
});

module.exports = router;
