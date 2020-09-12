# Keyfilekeeper Frontend
This is a react frontend for [keyfilekeeper](https://github.com/manzari/keyfilekeeper-server).

## Develop
Start the docker container used for development and execute the start script to bring up the development server.
There are many approaches to do so, find an example below.
```
docker-compose -f docker-compose.develop.yml up -d
docker exec -it keyfilekeeper_frontend_dev ash
npm start
```

## Deploy
Eventually modify `docker-compose.yml` and run `docker-compose up -d`.