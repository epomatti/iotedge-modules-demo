const iot = require('./config/iot.js');

var registry = iot.getRegistry();

deviceId = 'test001'

async function deleteDevice() {
    await registry.delete(deviceId).then(response => {
        console.log(response);
    });
}

(async () => {
    await deleteDevice();
})()