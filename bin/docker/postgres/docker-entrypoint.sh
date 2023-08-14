#!/usr/bin/env sh

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  create extension if not exists "uuid-ossp";
  create extension if not exists "plpgsql";
EOSQL
