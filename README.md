# Sportzify-Backend

## Introduction

A sports-blogging platform that allows sports enthusiasts to publish about their favorite sports topics & events.

This is the Website's backend part.

## [Frontend Github Link](https://github.com/makarov009/sportzify-frontend.git)  

## Technologies Used

[Node.js](https://nodejs.org/en) - Javascript Run-time.

[Express.js](https://expressjs.com/) - Node.js Framework.

[Sequelize](https://sequelize.org/) - ORM.

[Jest](https://jestjs.io/) - Javascript Testing Framework.

[jsonWebToken](https://jwt.io/) - Authentication & Authorization purpose.

and others.

## How to Run

### Step 1:

Make sure node.js is installed on your machine.

### Step 2:

Clone this Github Repo.

```bash
https://github.com/makarov009/sportzify-backend.git
```

### Step 3:

Create a database on [render.com](https://render.com/) or other online database hosting site and copy the connection url or required info to the .env file.

### Step 4:

Create a file called .env and write all the values of corresponding environment variable :

```bash
SERVER_PORT = 4001

DATABASE_URL = url from site for created database.
DB_HOST = given host name of database.
DB_PORT = port_numnber.
DB_USER = provided name of database.
DB_PASSWORD = provided passward for database.
DB_NAME = database name.
DB_DIALECT = used query language for database.
DB_STORAGE = :memory:

JWT_SECRET = random secret key.

CLOUD_NAME = cloud storage name.
CLOUD_API_KEY = API key for cloud storage.
CLOUD_API_SECRET = API secret for cloud storage.
```

### Step 5:

Make sure you have any package manager ( e.g npm,yarn etc) installed in your machine . Then run the following command-

For npm

```bash
npm i
```

for yarn

```bash
yarn install
```

### Step 6:

Finally run this command

```bash
npm start
```

If there is no error then it should run perfectly!!

## API Documentation

The complete API Documentation can be found
[HERE.](https://documenter.getpostman.com/view/20447287/2s93m1ZPvQ)
