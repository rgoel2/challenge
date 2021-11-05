'use strict';
const mockDBCalls = require('../database/index.js');

const getUsersHandler = async (request, response) => {
    try{
        const data = await mockDBCalls.getUsers();
        return response.status(200).json(data);
    } catch(e){
        return response.status(500).send('Something went wrong');
    }

};

module.exports = (app) => {
    app.get('/api/users', getUsersHandler);
};
