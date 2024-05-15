#!/bin/bash
docker image prune --force && docker compose up --build --detach