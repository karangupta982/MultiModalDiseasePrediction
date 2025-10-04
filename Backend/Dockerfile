FROM node:18-slim

# Set production mode
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Install Python and minimal build tools for native deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip python3-venv python3-dev build-essential gcc g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package metadata first
COPY package*.json ./ 
COPY requirements.txt ./ 

# Install Node production dependencies
RUN npm install --only=production

# Create a Python virtual environment and install deps
RUN python3 -m venv /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# Ensure venv is on PATH
ENV PATH="/opt/venv/bin:$PATH"
ENV PYTHON_PATH=/opt/venv/bin/python

# Copy application source
COPY . .

# Create and switch to non-root user
RUN groupadd -r appuser && useradd -r -g appuser -s /sbin/nologin appuser \
    && chown -R appuser:appuser /usr/src/app

USER appuser

EXPOSE 5000

CMD ["node", "server.js"]
