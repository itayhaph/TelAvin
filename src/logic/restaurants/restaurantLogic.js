const { searchRestaurantsInDb } = require('../../clients/mongoClient');

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

module.exports = {
    searchRestaurants,
    getRestaurants
};
