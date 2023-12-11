# SWAPI Cached wrapper
App wrapping [SWAPI](https://swapi.dev)'s API into new, cached API.
User `Redis` for storing cached responses.

Built using `nx` and `Nest.js`.

## Requirements
- Node 18.18.2
- Redis (latest version preferred)

## Running in dev environment
1. Create `.env` file based on provided `.env.example` template
2. Install dependencies
```bash
  yarn install --frozen-lockfile
```
3. Run app in watch mode
```bash
  yarn nx run dnd-swapi:serve
```

## Running via docker
1. Create `.env` file based on provided `.env.example` template
2. Run docker compose
```bash
  docker compose up -d
```
Running using `docker compose` uses locally-built image of the app (if not present, it will be built from scratch). Also, `REDIS_HOST` env value is bound to the redis container running alongside the app. 

## Configuration
Application uses following environmental variables:
- `SW_CLIENT_BASE_URL` - **REQUIRED** - base SWAPI URL (e.g. `https://swapi.dev/api`)
- `APP_PORT` - *OPTIONAL* - port at which app will listen for new connections (defaults to: `3000`)
- `REDIS_HOST` - *OPTIONAL* - Redis instance's host (defaults to: `127.0.0.1`)
- `REDIS_PORT` - *OPTIONAL* - Redis instance's port (defaults to: `6379`)
- `CACHE_TTL` - *OPTIONAL* - Time in seconds defining how long should responses be cached (defaults to `86400` - 24h)

## Documentation
API is documented using Swagger plugin to Nest.js - built docs are available on `/docs` path in the running app (e.g. if app is running on `localhost:3000`, then docs are available under `localhost:3000/docs`)
