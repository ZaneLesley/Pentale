# Dockerfile
FROM node:20-alpine

# Create app directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .
