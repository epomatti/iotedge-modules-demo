const config = require('./config/config.js');

var registry = config.getIoTRegistry();

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