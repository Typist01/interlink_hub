#!/bin/bash

# Step 1: Build the Docker image
docker build . --tag 'interlink_hub_docker_image'

# Step 2: Run the Docker container
# Note: Corrected the port mapping to -p host_port:container_port
docker run --detach -p 5433:5432 interlink_hub_docker_image

# Run migrations
env-cmd -f .env.local npx prisma migrate dev

# Run seeders
env-cmd -f .env.local npx prisma migrate seed

# Run the npm development server
npm run dev
