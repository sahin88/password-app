# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./app

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
#RUN npm run build

# Expose the port on which your React app runs (usually 3000)
EXPOSE 3000

# Define the command to start your React app
CMD ["npm", "start"]
