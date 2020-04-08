const config = require('./config/config.js');

var registry = config.getIoTRegistry();

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