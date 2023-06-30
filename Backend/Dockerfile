# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port on which your Node.js application will run
EXPOSE 9090

# Set the command to run your Node.js server
CMD ["npm", "start"]
