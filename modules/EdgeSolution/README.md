# Edge Solution

Module implemented with [this tutorial](https://docs.microsoft.com/en-us/azure/iot-edge/tutorial-develop-for-linux).

You'll need the infrasctrutcure build from the root of this repository.

Running it:

```s
# Within VS Code terminal
docker login -u <ACR username> -p <ACR password> <ACR login server>
```

Then `Build and Push IoT Edge Solution`. You might need to `sudo -s` so that VS Code can access docker.