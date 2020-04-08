require('dotenv').config()
var iothub = require('azure-iothub');

const getConnectionString = function () {
    return process.env.IOTHUB_CONNECTION_STRING;
}

const getRegistry = function () {
    var connectionString = getConnectionString();
    return iothub.Registry.fromConnectionString(connectionString);
}

module.exports = {
    getRegistry
}