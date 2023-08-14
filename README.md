# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Setup

- copy .env.example into .env and use or override variable values in it
- 
```
docker compose up
```

## Run tests

```
docker exec -it node-api npm run test
```

## Run lint

```
docker exec -it node-api npm run lint
```

## API

```
http://localhost:YOUR_PORT/api
```

## API Docs

```
http://localhost:YOUR_PORT/doc
```

## Image on docker hub

```
yradzivonau/nodejs2023q2-service-node-api
```