require('dotenv').config()
var iothub = require('azure-iothub');

var connectionString = process.env.IOTHUB_CONNECTION_STRING;
var registry = iothub.Registry.fromConnectionString(connectionString);

var devices = [];

async function listDevices() {
    await registry.list().then((response) => {
        response.responseBody.forEach(device => {
            devices.push(device.deviceId);
        })
    })
    console.log(devices);
}

(async () => {
    await listDevices();
})()