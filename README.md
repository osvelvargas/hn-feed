# Test: Nodeks + MongoDB + Angular + Docker

### Clone app from GitHub

First, clone from the following URL:


$ git clone https://github.com/osvelvargas/hn-feed.git 

**Dependencies:**
- *"express"* : node framework to api development.
- *"mongodb"* : database system.
- *"mocha"* : Mocha / Chai to tests.
- *"angular"* : client web applications.

### Start the Node application 

$ npm install

$ node app.js

### Create a docker image for the Node application

`Dockerfile` into root directory.

Dockerfile:
<pre>
FROM node:14.15.4

WORKDIR /usr/src/app

COPY . .

ENV MONGO_URI=mongodb://mongo:27017
ENV PORT=80

EXPOSE 80

CMD [ "npm", "start" ]
</pre>
### Create a docker image for the Node application

`Dockerfile` into root directory.

Dockerfile:
<pre>
FROM node:14.15.4

WORKDIR /usr/src/app

COPY . .

ENV MONGO_URI=mongodb://mongo:27017
ENV PORT=80

EXPOSE 80

CMD [ "npm", "start" ]
</pre>

`docker-compose` into root directory.

docker-compose.yml:
<pre>
version: "3"
services:
  app:
    container_name: app
    restart: always
    build: .
    ports:
      - "80:80"
    depends_on:
      - mongo
    networks:
      - app_network
    environment:
      - MONGO_URI=mongodb://mongo:27017
      - PORT=80
  mongo:
    container_name: mongo
    image: mongo
    networks:
      - app_network
    ports:
      - "27017"
networks:
  app_network:
</pre>

### `.dockerignore` file
.dockerignore:
<pre>
.idea/
npm-debug.log
.gitignore
package-lock.json
</pre>

### Building your docker image

<pre>
$ docker build -t osvelvargas/hn-feed .
</pre>

### run application

<pre>
$ docker-compose up
</pre>

### Pull application from hub.docker.com

<pre>
$ docker build -t osvelvargas/hn-feed .

$ docker-compose up
</pre>