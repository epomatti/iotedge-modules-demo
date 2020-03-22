require('dotenv').config()
var iothub = require('azure-iothub');

var connectionString = process.env.IOTHUB_CONNECTION_STRING;
var registry = iothub.Registry.fromConnectionString(connectionString);

device = {
    deviceId: 'test001',
    status: 'enabled',
    capabilities: {
        iotEdge: true
    }
}

async function listDevices() {
    await registry.delete('test001').then(response => {
        console.log(response);
    });
    await registry.create(device).then(response => {
        console.log(response);
    });
}

(async () => {
    await listDevices();
})()