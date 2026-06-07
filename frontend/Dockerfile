# Stage 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy the rest of the application and build
COPY . .
RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy custom nginx config if you have one, or use default
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (mapped to 5173 for consistency with user setup)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
