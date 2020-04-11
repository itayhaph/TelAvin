const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";


const restaurant = {
    name: 'yosef',
    type: 'Hummus',
    criticizes: [
        {
            diner: 'itayHaph',
            rating: '4.0',
            review: 'very tasty'
        },
        {
            diner: 'noa',
            rating: '3.0',
            review: ''
        },
        {
            diner: 'bordel',
            rating: '',
            review: 'wow ze nos'
        }
    ],
    favorites: ['itayHaph', 'noa', 'bordel']
};

const mongoTest = async () => {
    await MongoClient.connect(url, async (err, db) => {
        if (err) throw err;
        const dbo = db.db('local');

        await dbo.collection('restaurants').insertOne(restaurant, async (err, res) => {
            if (err) throw err;
            db.close();
            console.log("1 document inserted");
        });
    });
};

const searchRestaurant = (query) => {
    const regexQuery = new RegExp(query);

    try {
        MongoClient.connect(url, async(err, db) => {
            const dbo = db.db('local');
            const restaurants = await dbo.collection('restaurants')
                .find({ "name": regexQuery }).toArray();

            db.close();
            console.log(restaurants, 'mongoClient');

            return restaurants;
        });
    }

    catch (err) {
        return err;
    }
};

module.exports = {
    mongoTest,
    searchRestaurant
};
