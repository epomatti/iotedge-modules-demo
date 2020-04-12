const iot = require('../config/iot');
const fs = require('fs');
const path = require("path");

let rawdata = fs.readFileSync(path.resolve(__dirname, "deployContentTemplate.json"));
let deployContent = JSON.parse(rawdata);

content = addVersion(deployContent);
content = addTargetConditionAndPriority("*", 1);
content = addDockerRegistry(deployContent, "myRegistry", "fakeRepository", "login", "password");
content = addDockerModule(deployContent, 
    "SimulatedTemperatureSensor", 
    "mcr.microsoft.com/azureiotedge-simulated-temperature-sensor", 
    "1.0", 
    {}, 
    {
        "SendData": true,
        "SendInterval": 5
    });
content = addRoute(deployContent, 
    "SimulatedTemperatureSensorToIoTHub", 
    "FROM /messages/modules/SimulatedTemperatureSensor/* INTO $upstream");


var registry = iot.getRegistry();

async function createExampleDeploy() {
    await registry.addConfiguration(deployContent).then((response) => {
        console.log(response);    
    })
}

(async () => {
    await createExampleDeploy();
})()

function addVersion(content) {
    let now = '' + Date.now();
    content.id = "testing-sdk-" + now;
    content.labels.version = "version-" + now;
    return content;
}

function addDockerRegistry(content, name, address, username, password) {
    let registries = content.content.modulesContent.$edgeAgent["properties.desired"].runtime.settings.registryCredentials;
    registries[name] = {
        "address" : address,
        "username" : username,
        "password" : password
    };
    return content;
}

function addDockerModule(content, name, image, version, createOptions, propertiesDesired) {
    let modulesContent = content.content.modulesContent;
    let modules = modulesContent.$edgeAgent["properties.desired"].modules;
    modulesContent[name]["properties.desired"] = propertiesDesired;
    modules[name] = {
        "settings": {
            "image": image + ":" + version,
            "createOptions": JSON.stringify(createOptions)
        },
        "type": "docker",
        "status": "running",
        "restartPolicy": "always",
        "version": version
    }
    return content;
}

function addTargetConditionAndPriority(content, condition, priority) {
    content.targetCondition = condition;
    content.priority = priority;
    return content;
}

function addRoute(content, name, routing) {
    let routes = content.content.modulesContent.$edgeHub["properties.desired"].routes;
    routes[name] = routing;
    return content;
}