const { insertToDbTest, getDinerFromDb, insertReviewToDiners } = require('../../clients/mongoClient');

const insertDiner = async () => {
    const diner = {
        name: 'itay haph',
        favorites: ['yosefId...'],
        critics: [
            {
                restaurantId: '1234',
                rating: 4.0,
                review: 'very good'
            }
        ]
    };

    await insertToDbTest(diner, 'diners');
};

const getDiner = async (req) => {
    const { dinerName } = req.params;

    const diner = await getDinerFromDb(dinerName);

    return diner;
};

const addReview = async (req) => {
    const { dinerName } = req.params;
    const { restaurantId, rating, review } = req.body;

    const dinerReview = {
        restaurantId,
        rating,
        review
    };

    const isSuccess = await insertReviewToDiners(dinerName, dinerReview);
    return isSuccess;
};

module.exports = {
    insertDiner,
    getDiner,
    addReview
};
