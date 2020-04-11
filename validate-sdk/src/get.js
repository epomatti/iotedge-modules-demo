const iot = require('./config/iot.js');

var registry = iot.getRegistry();

deviceId = 'test001'

async function getDevice() {
    const device = await registry.get(deviceId);
    console.log(device);
}

(async () => {
    await getDevice();
})()