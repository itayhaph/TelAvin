const { mongoTest, searchRestaurant } = require('../../clients/mongoClient');

const searchRestaurants = async (req) => {
    const { query } = req.query;

    const restaurants = await searchRestaurant(query);
    console.log(restaurants, 'rest logic'); // the server does not wait for the function 

    return restaurants;
};

const testFirstMongoInsert = async () => {
    return mongoTest();
};

module.exports = {
    searchRestaurants,
    testFirstMongoInsert
};
