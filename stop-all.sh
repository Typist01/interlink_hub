#!/bin/bash

# Step 1: Stop the Docker container
# Using the `docker ps` command to find the container running the 'interlink_hub_docker_image' and stop it.
CONTAINER_ID=$(docker ps -q -f "ancestor=interlink_hub_docker_image")
if [ -n "$CONTAINER_ID" ]; then
    echo "Stopping container $CONTAINER_ID..."
    docker stop $CONTAINER_ID
else
    echo "No running container found for 'interlink_hub_docker_image'."
fi

# Step 2: Remove the stopped container
# This step is optional and can be skipped if you plan to restart the container without rebuilding.
if [ -n "$CONTAINER_ID" ]; then
    echo "Removing container $CONTAINER_ID..."
    docker rm $CONTAINER_ID
fi

# Include any additional cleanup tasks
# For example, removing volumes or networks if necessary
# echo "Performing additional cleanup tasks..."

echo "Cleanup complete."
