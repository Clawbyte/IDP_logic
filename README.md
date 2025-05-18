# IDP_logic
IDP project: microservice for business logic

## Usage
* First, build the image with `docker build -t logic-backend:latest ./logic-backend`
* Before running anything, make sure you created the network with `docker network create --driver overlay --scope swarm app-network`
* You can check if the network exists with `docker network ls`
* To use the IO service, simply run `docker stack deploy -c docker-compose.yml logic_stack` inside this folder after the previous steps
* Running the server locally will not work, always run through docker

## Functionality
* Implemented all the logic of the application

## Technologies
Express, Typescript, MongoDB, MongoDB Compass, Docker, Docker Compose, Docker Swarm

