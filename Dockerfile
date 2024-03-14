# Use Node.js image as the base image for building the Angular app
FROM node:latest as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN ng build --prod

# Use NGINX base image
FROM nginx:alpine

# Remove the default NGINX configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom NGINX configuration to serve Angular app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app to NGINX public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
