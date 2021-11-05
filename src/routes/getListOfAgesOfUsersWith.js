'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    try{
        const itemToLookup = request.query.item;
        const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
        return response.status(200).json(data);
    }catch(e){
        return response.status(500).send('something went wrong')
    }
};

module.exports = (app) => {
    app.get('/api/users/age', getListOfAgesOfUsersWithHandler);
};
