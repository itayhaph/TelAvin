import { MongoClient } from 'mongodb';
import { mongoUrl, mongoDb } from '../../configuration';

const deleteFavoriteInDiners = async (dinerName, restaurantId) => {
    let connection;

    try {
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

        const dinerSucceeded = await dbo.collection('diners').findOneAndUpdate(
            { 'name': dinerName },
            { $pull: { 'favorites': restaurantId } }
        );

        return dinerSucceeded;
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

const deleteFavoriteInRestaurants = async (dinerName, restaurantId) => {
    let connection;
    try {
        connection = await MongoClient.connect(mongoUrl);
        const dbo = connection.db(mongoDb);

        const restaurantSucceeded = await dbo.collection('restaurants').findOneAndUpdate(
            { 'id': restaurantId },
            { $pull: { 'favorites': dinerName } }
        );

        return restaurantSucceeded;
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
    deleteFavoriteInDiners,
    deleteFavoriteInRestaurants
};
