#!/usr/bin/env bash

# Delete old sqlite db
rm -rf prisma/dev.db

# Discard previous migrations data
rm -rf prisma/migrations

# Create database tables
prisma migrate save --name 'doge' --experimental
prisma migrate up --experimental

# Generate Prisma code (not used by Postgres)
prisma generate
