# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Declare build-time args
ARG VITE_API_URL
ARG VITE_GAME_URL
ARG VITE_ROOT_URL

# Set them as ENV vars for build step
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GAME_URL=$VITE_GAME_URL
ENV VITE_ROOT_URL=$VITE_ROOT_URL

# Copy only what's needed
COPY package*.json ./
RUN npm install

# Now copy the rest
COPY . .

# Build
RUN npm run build

# Optional: expose port (not needed for static build)
# EXPOSE 3000

# This image ends here — build artifacts are in /app/dist
CMD ["echo", "Build complete. Use NGINX or another server to serve /app/dist"]
