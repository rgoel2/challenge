'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        // fill me in :)
        // Create a map of username with count as {name: username, count: {false, true}}
        const usersWithItemCount = _.map(db.itemsOfUserByUsername, (value,key) => { return { name: key, count: _.countBy(value, (a) => a === item)}});
        // Filter the users who has true value for count.
        const filteredUsers = _.filter(usersWithItemCount, (obj) => obj.count.true)
        // Map the users with user profiles and return the map of age and item count.
        const agesWithItemCount = _.map(filteredUsers, (obj) => { return {age: _.result(_.find(db.usersById, (user) => user.username === obj.name), 'age'), count: obj.count.true}});
        // Sort the result in increaing age order.
        const sortedResult = _.sortBy(agesWithItemCount, (obj) => obj.age);
        // return the result in format [{age: 1, count: 1}, ..].
        return sortedResult;

    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith
};
