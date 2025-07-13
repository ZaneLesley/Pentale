# Use Node base image
FROM node:20-alpine

# Install Python and pip
RUN apk add --no-cache python3 py3-pip py3-virtualenv

# Create app directory
WORKDIR /app

# Copy everything
COPY . .

# Create and use virtualenv for pip installation
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir -r /app/python/scraper/requirements.txt

# Add the venv to PATH for later steps
ENV PATH="/opt/venv/bin:$PATH"

# Install Node dependencies
RUN npm install
