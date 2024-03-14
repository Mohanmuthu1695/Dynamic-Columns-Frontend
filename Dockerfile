# Frontend Dockerfile

# Use Node.js image as the base image
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

# Use NGINX base image
FROM nginx:alpine

# Copy built Angular app to NGINX public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
