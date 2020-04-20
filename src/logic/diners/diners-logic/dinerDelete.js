const { deleteFavoriteInDiners,
    deleteFavoriteInRestaurants } = require('../../../clients/mongo-client/mongoDelete');

const deleteFavorite = async (req) => {
    const { dinerName, restaurantId } = req.params;
    const dinerSuccess = await deleteFavoriteInDiners(dinerName, restaurantId);
    const restaurantSuccess = await deleteFavoriteInRestaurants(dinerName, restaurantId);

    if (dinerSuccess.value !== null && restaurantSuccess.value !== null) {
        return 'success';
    }

    return 'failed';
};

module.exports = {
    deleteFavorite
};
