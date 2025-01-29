# 1) Build stage
FROM node:22-alpine AS build

# Create app directory
WORKDIR /app

# Copy package.json and lockfile first for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the frontend code
COPY . .

# Build the React app (output goes to /app/build)
RUN npm run build


# 2) Production stage
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static build output from the build stage to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
