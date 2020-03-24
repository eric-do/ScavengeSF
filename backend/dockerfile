# Use latest version of Node
FROM node:latest

# Set working directory to /app
WORKDIR /app

# Copy current directory contents to container at /app
COPY . /app

# Install dependencies
RUN npm install

# Make port 3000 available to public
EXPOSE 3000

# Run the app
CMD ["npm", "start"]