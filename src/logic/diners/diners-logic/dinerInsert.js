const { insertReviewToDiners,
    insertFavoriteToDiners,
    insertToDbTest } = require('../../../clients/mongo-client/mongoInsert');

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

const addFavorite = async (req) => {
    const { dinerName, restaurantId } = req.params;

    const isSuccess = await insertFavoriteToDiners(dinerName, restaurantId);

    if (isSuccess.value === null) {
        return 'false';
    }
    return 'success';
};

module.exports = {
    insertDiner,
    addReview,
    addFavorite
};
