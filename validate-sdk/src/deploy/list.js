const iot = require('../config/iot');

const deployName = 'besta';
var registry = iot.getRegistry();

async function listDeploys() {
    await registry.getConfigurations().then((response) => {
        console.log(JSON.stringify(response.responseBody, null, '  '));    
    })
}

async function listOneDeploy() {
    await registry.getConfiguration(deployName).then((response) => {
        console.log(JSON.stringify(response.responseBody, null, '  '));    
    })
}

(async () => {
    await listDeploys();
    await listOneDeploy();
})()