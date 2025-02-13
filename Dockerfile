# Use official Node.js image (choose required version)
FROM node:20-alpine
# Set working directory inside container
WORKDIR /app
# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy application code
COPY . .
# Expose application port
EXPOSE 3000
# Command to run the application
CMD ["node", "src/index.js"]
