# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /home/app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install mongoose

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
