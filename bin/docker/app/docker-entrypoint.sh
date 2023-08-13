#!/usr/bin/env sh

set -e

echo "Installing application.."

npm install;

#npm run typeorm migration:run -- --dataSource=src/dataSource.ts

echo "Running application(dev)...";

npm run typeorm migration:run -- --dataSource=ormconfig.ts

npm run start:dev