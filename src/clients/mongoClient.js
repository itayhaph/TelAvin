const { MongoClient } = require('mongodb');
const { mongoUrl, mongoDb } = require('../configuration');
const searchRestaurantsInDb = async (query) => {
    let connection;

    try {
        const regexQuery = new RegExp(query);

        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

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
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

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
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

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
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

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
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

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
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

        const isSucceeded = await dbo.collection('restaurants').findOneAndUpdate(
            { 'id': restaurantId },
            { $addToSet: { 'criticizes': review } }
        );

        return isSucceeded === null || isSucceeded === undefined;
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

const insertFavoriteToDiners = async (dinerName, restaurantId) => {
    let connection;
    try {
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

        const isSucceeded = await dbo.collection('diners').findOneAndUpdate(
            { 'name': dinerName },
            { $addToSet: { 'favorites': restaurantId } }
        );

        return isSucceeded;
    }

    catch (err) {
        Promise.reject(err);
    }

    finally {
        if (connection) {
            connection.close()
            console.log('Mongo Close');
        }
    }
};

const insertFavoriteToRestaurants = async (restaurantId, dinerName) => {
    let connection;
    try {
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

        const isSucceeded = await dbo.collection('restaurants').findOneAndUpdate(
            { 'id': restaurantId },
            { $addToSet: { 'favorites': dinerName } }
        );

        return isSucceeded;
    }

    catch (err) {
        Promise.reject(err);
    }

    finally {
        if (connection) {
            connection.close()
            console.log('Mongo Close');
        }
    }
};

module.exports = {
    searchRestaurantsInDb,
    getRandomRestaurantFromDb,
    getDinerFromDb,
    insertToDbTest,
    insertReviewToDiners,
    insertReviewToRestaurants,
    insertFavoriteToDiners,
    insertFavoriteToRestaurants
};
