# ProShop eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User sign up and login using jwt
- User profile with orders
- Product review managemnet
- Give ratings to products
- Admin product management
- Admin user management
- Admin Order details page
- Admin create a new product
- Admin ability to edit or delete a product
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)
- Fully functional rest api using Nodejs and express

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
CLOUD_NAME = sample name of your bucket name when creating bucket
CLOUD_API_KEY = api key from cloudinary
CLOUD_API_SECRET = api secret from cloudinary
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev
# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import
# Destroy data
npm run data:destroy
```

```
Sample User Logins
steve@email.com (Customer)
123456
john@email.com  (Customer)
123456
```

## License

The MIT License

Copyright © Pro-MERN-Shop