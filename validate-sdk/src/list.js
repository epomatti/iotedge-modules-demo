const iot = require('./config/iot.js');

var registry = iot.getRegistry();

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