[![Build Status](https://travis-ci.com/ayebareM/node-backend-Ekalaamu.svg?branch=develop)](https://travis-ci.com/ayebareM/node-backend-Ekalaamu)


Ekalaamu is a platform for writers 

## PROJECT REQUIREMENTS
- Node.js 
- PostgreSQL 
- Sequelize
- Docker

## PROJECT SETUP

Your `.env` should contain the variables listed below, you can reference the file to see how it is used.

```DATABASE
   DATABASE_USER
   DATABASE_PASSWORD
   JWT_ISSUER=
   JWT_SECRET=
   SENDGRID_API_KEY=
   MAIL_RETURN_URL=http://localhost:3000/api/v1/verify-email
   AUTH_EMAIL=noreply@ekaalamu.com
   PORT=2000
   APP_URL
   
   
   # google developer credentials
   googleClientID
   googleClientSecret
   
   # facebook developer credentials
   facebookClientID
   facebookClientSecret
   
   # twitter developer credentials
   twitterClientID
   twitterClientSecret
```

### STARTING THE APP
Clone from git using

```
https://github.com/ayebareM/node-backend-Ekalaamu

```

Create a `.env` file in the root directory. Use the content of the `.env-sample` and edit with the appropriate details.

Reach out to the Team for the appropriate `.env` details when in doubt. :)


If you need to START the application after the initial setup has completed you can run the command:

```
npm install

```
to install the application dependencies


### STOPPING THE APP

```
ctrl+c
```

### Node Installation

It is advisable to use node version 10 and above for this project. Check your node version using `node --version`. To help manage the node versions you can install and run on your system nvm. Follow this [guide](https://gist.github.com/d2s/372b5943bce17b964a79#install-nvm-for-managing-nodejs-versions) to help install nvm.

You would then run `nvm install v10.0` to install node version 10 and `nvm use v10` to use that specific node version, but this will only work with that running bash session. To make version 10 the default node version for your system you would use `nvm alias default 10.0`


### SETTING UP WITH DOCKER

Before booting up the environment (`docker-compose up --build`) ensure that you have [docker](https://docs.docker.com/) **installed** and **running** on your machine.
If you are using mac this [install](https://docs.docker.com/docker-for-mac/install/) should get you started.

The resources will be configured via docker-compose services. This will ensure that the application will be developed and deployed under similar environments.

To setup development environment, create a `.env` file in the `root` directory and populate it with environment variables using `.env-sample` file in the root directory as a model.

To start the build, run:

```
docker-compose up --build
```

After the build is complete, you can view the running the docker containers with:

```
docker ps
```

Then you can access the backend application; served at `http://localhost:8000` by the node server.
To stop the application, you can pull down the containers with:

```
docker-compose down
```

### UI

The UI(client) for the project is available [here](https://ekalaamu.netlify.com/)

## CONTRIBUTORS

View the list of [contributors](https://github.com/ayebareM/node-backend-Ekalaamu/graphs/contributors) who contribute to this project.
