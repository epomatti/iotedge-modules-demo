require('dotenv').config()
var iothub = require('azure-iothub');

var connectionString = process.env.IOTHUB_CONNECTION_STRING;
var registry = iothub.Registry.fromConnectionString(connectionString);

deviceId = 'test001'

device = {
    deviceId: deviceId,
    status: 'enabled',
    capabilities: {
        iotEdge: true
    }
}

async function listDevices() {
    await registry.delete(deviceId).then(response => {
        console.log(response);
    });
    await registry.create(device).then(response => {
        console.log(response);
    });
}

(async () => {
    await listDevices();
})()