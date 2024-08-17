# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Run the build command to create the dist folder
RUN npm run build

# Expose the backend port (optional, uncomment if needed)
# EXPOSE 8443

# Start the application
CMD ["node", "./dist/server.js"]