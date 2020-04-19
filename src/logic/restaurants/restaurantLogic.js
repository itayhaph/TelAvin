const { searchRestaurantsInDb, getRandomRestaurantFromDb, insertReviewToRestaurants } = require('../../clients/mongoClient');

const searchRestaurants = async (req) => {
    const { query } = req.query;

    const searchedRestaurants = await searchRestaurantsInDb(query);

    const restaurants = searchedRestaurants.map((restaurant) => ({
        name: restaurant.name,
        type: restaurant.type
    }));

    return restaurants;
};

const getRestaurants = async (req) => {
    const { query } = req.query;

    const restaurants = await searchRestaurantsInDb(query);

    return restaurants;
};

const getRandomRestaurant = async () => {
    const restaurant = await getRandomRestaurantFromDb();

    return restaurant;
};

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

module.exports = {
    searchRestaurants,
    getRestaurants,
    getRandomRestaurant,
    addReview
};
