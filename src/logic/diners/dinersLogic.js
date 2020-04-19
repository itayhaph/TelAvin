const { getDinerFromDb } = require('../../clients/mongo-client/mongoSearch');
const { insertReviewToDiners,
    insertFavoriteToDiners,
    insertToDbTest } = require('../../clients/mongo-client/mongoInsert');
const { deleteFavoriteInDiners,
    deleteFavoriteInRestaurants } = require('../../clients/mongo-client/mongoDelete');


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

const addFavorite = async (req) => {
    const { dinerName, restaurantId } = req.params;

    const isSuccess = await insertFavoriteToDiners(dinerName, restaurantId);

    if (isSuccess.value === null) {
        return 'false';
    }
    return 'success';
};

const deleteFavorite = async (req) => {
    const { dinerName, restaurantId } = req.params;
    const dinerSuccess = await deleteFavoriteInDiners(dinerName, restaurantId);
    const restaurantSuccess = await deleteFavoriteInRestaurants(dinerName, restaurantId);

    if (dinerSuccess.value !== null && restaurantSuccess.value !== null) {
        return 'success';
    }
    
    return 'failed';
};

module.exports = {
    insertDiner,
    getDiner,
    addReview,
    addFavorite,
    deleteFavorite
};
