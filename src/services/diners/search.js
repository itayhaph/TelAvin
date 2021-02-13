const { getDinerFromDb } = require('../../clients/mongoClient/search');

const getDiner = async (req) => {
    const { dinerName } = req.params;

    const diner = await getDinerFromDb(dinerName);

    return diner;
};

module.exports = {
    getDiner
};
