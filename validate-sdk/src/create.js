const iot = require('./config/iot.js');

var registry = iot.getRegistry();

deviceId = 'test001'

device = {
    deviceId: deviceId,
    status: 'enabled',
    capabilities: {
        iotEdge: true
    }
}

async function createDevice() {
    await registry.create(device).then(response => {
        console.log(response);
    });
}

(async () => {
    await createDevice();
})()