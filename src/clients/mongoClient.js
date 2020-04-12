const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

const searchRestaurantsInDb = async (query) => {
    let connection;

    try {
        const regexQuery = new RegExp(query);

        connection = await MongoClient.connect(url);
        const dbo = connection.db('local');

        const restaurants = await dbo.collection('restaurants')
            .find({ $or: [{ 'name': regexQuery }, { 'type': regexQuery }] }).toArray();

        return restaurants;
    }

    catch (err) {
        return err;
    }

    finally {
        if (connection) {
            connection.close();
            console.log('MONGO CONNECTION CLOSED');
        }
    }
};

module.exports = {
    searchRestaurantsInDb
};
