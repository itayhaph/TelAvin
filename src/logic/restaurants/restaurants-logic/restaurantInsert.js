const { insertFavoriteToRestaurants,
    insertReviewToRestaurants } = require('../../../clients/mongo-client/mongoInsert');

const addReview = async (req) => {
    const { restaurantId } = req.params;
    const { dinerName, rating, review } = req.body;

    const restaurantReview = {
        dinerName,
        rating,
        review
    };

    const isSuccess = await insertReviewToRestaurants(restaurantId, restaurantReview);
    return isSuccess;
};

const addFavorite = async (req) => {
    const { restaurantId, dinerName } = req.params;

    const isSuccess = await insertFavoriteToRestaurants(restaurantId, dinerName);
    if (isSuccess.value !== null) {
        return 'success';
    }

    return 'failed';
};

module.exports = {

    addReview,
    addFavorite
};
