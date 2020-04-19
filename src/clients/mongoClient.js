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

const insertToDbTest = async (value, collection) => {
    let connection;

    try {
        connection = await MongoClient.connect(url);
        const dbo = connection.db('local');

        await dbo.collection(collection).insertOne(value);
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
}

const getDinerFromDb = async (dinerName) => {
    let connection;

    try {
        connection = await MongoClient.connect(url);
        const dbo = connection.db('local');

        const diner = await dbo.collection('diners')
            .findOne({ 'name': dinerName });

        return diner;
    }

    catch (err) {
        return Promise.reject(err);
    }

    finally {
        if (connection) {
            connection.close();
            console.log('MONGO CONNECTION CLOSED');
        }
    }
};

const getRandomRestaurantFromDb = async () => {
    let connection;

    try {
        connection = await MongoClient.connect(url);
        const dbo = connection.db('local');

        const restaurant = await dbo.collection('restaurants')
            .aggregate([{ $sample: { size: 1 } }]).toArray();

        return restaurant;
    }

    catch (err) {
        return Promise.resolve(err);
    }

    finally {
        if (connection) {
            connection.close();
            console.log('MONGO CONNECTION CLOSED');
        }
    }
};

const insertReviewToDiners = async (diner, review) => {
    let connection;

    try {
        connection = await MongoClient.connect(url);
        const dbo = connection.db('local');

        const isSucceeded = await dbo.collection('diners').findOneAndUpdate(
            { 'name': diner },
            { $addToSet: { 'critics': review } }
        );

        return isSucceeded !== null && isSucceeded !== undefined;
    }

    catch (err) {
        Promise.reject(err);
    }

    finally {
        if (connection) {
            connection.close();
            console.log();
        }
    }
};

const insertReviewToRestaurants = async (restaurantId, review) => {
    let connection;

    try {
        connection = await MongoClient.connect(url);
        const dbo = connection.db('local');

        await dbo.restaurants.findOneAndUpdate(
            { '_id': restaurantId },
            { 'criticizes': review }
        );
    }

    catch (err) {
        Promise.reject(err);
    }

    finally {
        if (connection) {
            connection.close();
            console.log();
        }
    }
};


module.exports = {
    searchRestaurantsInDb,
    getRandomRestaurantFromDb,
    getDinerFromDb,
    insertToDbTest,
    insertReviewToDiners
};
