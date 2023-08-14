FROM yradzivonau/nodejs2023q2-service-node-api as parent

RUN mkdir -p /home/node/app

WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build


### Production environment ###
FROM node:18-alpine as prod

ENV NODE_ENV production

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci --only=prod && npm cache clean --force

COPY --from=parent /home/node/app/dist ./dist
COPY --from=parent /home/node/app/doc ./doc
COPY --from=parent /home/node/app/bin/docker/app ./bin/docker/app

RUN ls -la

EXPOSE 3000

CMD ["node", "dist/main"]

### Development environment ###
FROM parent as dev

ENTRYPOINT ./bin/docker/app/docker-entrypoint.sh