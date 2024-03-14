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
RUN ng build 

# Install http-server globally to serve the Angular app
RUN npm install -g http-server

# Expose port 8080 (default port for http-server)
EXPOSE 8080

# Command to run the http-server and serve the Angular app
CMD ["http-server", "/app/dist"]
