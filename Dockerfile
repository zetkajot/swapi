FROM node:18.18.2-alpine as build

WORKDIR /build
COPY . .

RUN yarn install --frozen-lockfile --cache-folder .yarn-cache
RUN NODE_ENV=production yarn nx run dnd-swapi:build
RUN rm -rf node_modules \ 
  && NODE_ENV=production yarn install \
    --frozen-lockfile \
    --production=true \
    --prefer-offline \
    --cache-folder .yarn-cache

FROM node:18.18.2-alpine
RUN addgroup --system swapi \
  && adduser \
    --system \
    --ingroup swapi \
    --no-create-home \
    --disabled-password swapi
USER swapi

WORKDIR /app

COPY --chown=swapi:swapi --from=build /build/dist/apps/dnd-swapi /build/package.json /build/yarn.lock ./
COPY --chown=swapi:swapi --from=build /build/node_modules ./node_modules
RUN ls -la
CMD [ "node", "main.js" ]
