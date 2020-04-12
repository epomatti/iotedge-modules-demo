# Edge Solution Custom Code

Module implemented with [this tutorial](https://docs.microsoft.com/en-us/azure/iot-edge/tutorial-csharp-module).

You'll need the infrasctrutcure build from the root of this repository.

Running it:

```sh
# Within VS Code terminal
docker login -u <ACR username> -p <ACR password> <ACR login server>
```

Then `Build and Push IoT Edge Solution`. You might need to `sudo -s` so that VS Code can access docker.

Also, test the twin features:

1. Edit module twin
2. Chagen `TemperatureThreshold`
3. Update module twin
