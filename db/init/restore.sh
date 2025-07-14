#!/bin/bash
set -e
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -a -f /docker-entrypoint-initdb.d/dump.sql
