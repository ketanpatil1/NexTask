# NexTask

NexTask is a web-based Task Management Application built using Django.  

## Running in development
To run this project in development mode, you'll need a `.env.dev` file in the project root. You can use the `.env.example` file as reference.

### Using Docker/Podman Compose
You can run the project using Docker/Podman Compose, using this command:
``` bash
docker-compose -f ./compose.dev.yaml up -d
```

To stop it, run the following command:
```bash
docker-compose -f ./compose.dev.yaml down
```
