# Swiftcart API

A RESTful API for an e-commerce platform built with Node.js, Sequelize, and PostgreSQL (hosted on Neon), containerized using Docker.

## 🚀 Features

- User authentication with JWT
- Product catalog and search
- Shopping cart with add/remove functionality
- Checkout with order creation
- Dockerized for easy deployment and local testing
- OpenAPI spec provided for testing with tools like [APIdog](https://apidog.com)

---

## 📦 How to Clone and Run

### 1. Clone the Repository

```bash
git clone https://github.com/sarbear28/Swiftcart-API_HODGE.git
cd Swiftcart-API_HODGE

### 2. Add your .env file
Create a .env file with the following content: 

DATABASE_URL=postgresql://<username>:<password>@<your-neon-host>/<dbname>?sslmode=require
PORT=3000
JWT_SECRET=your_secret_key

### 3. Build and run the app in Docker
docker-compose up --build
the app will be accesible at http://localhost:3000

## API Testing
Import the switftcart_api_final.json file into APIDog or Postman to test the API endpoints

## Files included
1. Dockerfile = for containerizing the Node.js app
2. docker-compose.yaml - for running the app locally
3. switftcart_api_final.json - for testing the API endpoints

## Notes
- .env has been excldued from the repo for security
the app uses process.env.DATABASE_URL directly in Sequelize setup



