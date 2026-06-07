# --- Stage 1: Build the Frontend ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --silent
COPY frontend/ .
RUN npm run build

# --- Stage 2: Final Image (Backend + Frontend) ---
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8000

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend project files
COPY backend/ ./backend/
COPY llm/ ./llm/
COPY model/ ./model/

# Copy the built frontend from Stage 1 into the location expected by the backend
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Set working directory to backend to run main.py
WORKDIR /app/backend

# Expose the port (Render uses the PORT env var)
EXPOSE 8000

# Command to run the application using the $PORT environment variable
CMD ["python", "main.py"]
