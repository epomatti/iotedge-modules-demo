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

async function listOneDevice() {
    await registry.get('myEdgeDevice').then((response) => {
        console.log(JSON.stringify(response.responseBody, null, '  '));    
    })
    console.log(devices);
}

(async () => {
    await listDevices();
    await listOneDevice();
})()