const express = require('express');
const { insertDiner } = require('../../../logic/diners/dinersLogic');

const router = express.Router();

router.get('/', async (req, res) => {
    await insertDiner();
    res.send('success');
});

module.exports = router;
