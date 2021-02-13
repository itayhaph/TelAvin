import { MongoClient } from 'mongodb';
import { mongoUrl, mongoDb } from '../../configuration';

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

module.exports = {
    searchRestaurantsInDb,
    getDinerFromDb,
    getRandomRestaurantFromDb
};
