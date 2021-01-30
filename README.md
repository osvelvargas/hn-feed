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
FROM node:14

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8081

CMD ["node", "app.js"]

</pre>

### `.dockerignore` file
.dockerignore:
<pre>
node_modules
npm-debug.log
</pre>

### Building your docker image

<pre>
$ docker build -t osvelvargas/hn-feed .
</pre>

### Pull application from hub.docker.com

<pre>
$ docker pull osvelvargas/hn-feed:latest

or to run

$ docker run -dp 8085:8085 osvelvargas/hn-feed:latest
</pre>