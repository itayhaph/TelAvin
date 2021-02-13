const { MongoClient } = require('mongodb');
const { mongoUrl, mongoDb } = require('../../configuration');

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
    insertToDbTest,
    insertReviewToDiners,
    insertReviewToRestaurants,
    insertFavoriteToDiners,
    insertFavoriteToRestaurants
};
