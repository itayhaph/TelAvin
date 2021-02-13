const { searchRestaurantsInDb,
    getRandomRestaurantFromDb } = require('../../../clients/mongo-client/mongoSearch');

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

module.exports = {
    searchRestaurants,
    getRestaurants,
    getRandomRestaurant
};
