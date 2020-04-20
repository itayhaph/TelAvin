const { getDinerFromDb } = require('../../../clients/mongo-client/mongoSearch');

const getDiner = async (req) => {
    const { dinerName } = req.params;

    const diner = await getDinerFromDb(dinerName);

    return diner;
};

module.exports = {
    getDiner
};
