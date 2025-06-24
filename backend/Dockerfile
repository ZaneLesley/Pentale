# Dockerfile
FROM node:20-alpine

# Install Python and pip
RUN apk add --no-cache python3 py3-pip py3-virtualenv

# Create app directory inside the container
WORKDIR /app
COPY . .

RUN python3 -m venv /app/python/scraper/env && \
    . /app/python/scraper/env/bin/activate && \
    pip install --no-cache-dir -r /app/python/scraper/requirements.txt

RUN npm install

