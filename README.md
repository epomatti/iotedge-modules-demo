# IoT Edge Demo

Delivery of code to remote devices using Azure IoT Edge.

<img src=".docs/IoT-Edge.svg" width=50>

## Getting started

Create the infraestructure:

```sh
# Setup
az extension add --name azure-iot
az group create --name edge --location eastus2

# VM
# Set the auto-shutdown using the portal, not available in Azure CLI
az vm image terms accept --urn microsoft_iot_edge:iot_edge_vm_ubuntu:ubuntu_1604_edgeruntimeonly:latest
az vm create --resource-group edge --name EdgeVM --image microsoft_iot_edge:iot_edge_vm_ubuntu:ubuntu_1604_edgeruntimeonly:latest --admin-username azureuser --generate-ssh-keys

# IoT Hub
az iot hub create --resource-group edge --name {hub_name} --sku F1 --partition-count 2
az iot hub device-identity create --hub-name {hub_name} --device-id myEdgeDevice --edge-enabled
az iot hub device-identity show-connection-string --device-id myEdgeDevice --hub-name {hub_name}

# Replace {device_connection_string} with the connection string
az vm run-command invoke -g edge -n EdgeVM --command-id RunShellScript --script "/etc/iotedge/configedge.sh '{device_connection_string}'"
```

Manage the device:

```sh
# Test the IoT Edge runtime
ssh azureuser@{publicIpAddress}
sudo systemctl status iotedge

# If you need to troubleshoot the service, retrieve the service logs.
journalctl -u iotedge

# View the modules running on your device.
sudo iotedge list

# Check the runtime
sudo iotedge check
```

If you run error `417 -- The device's deployment configuration is not set` don't worry, check [this issue](https://github.com/MicrosoftDocs/azure-docs/issues/50665).

## Modules

To create modules on top of this infrastructure, check [modules](modules) directory.

- EdgeModule - A simple module
- EdgeModuleCSharp - A custom code module


## Admin commands

Turning off your VM to avoid costs:

```sh
az vm deallocate -g edge -n EdgeVM
```

Deleting the resource group:

```sh
az group delete -n edge
```

## References

[Quick start Linux](https://docs.microsoft.com/en-us/azure/iot-edge/quickstart-linux)

[How to install IoT Edge on Linux](https://docs.microsoft.com/en-us/azure/iot-edge/how-to-install-iot-edge-linux)
