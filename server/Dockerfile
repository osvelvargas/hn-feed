FROM node:14.15.4

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 8085 27025

# start app
CMD ["node", "app.js"]