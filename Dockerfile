FROM node
WORKDIR /usr/src/app
RUN npm install -g sails
COPY application/package*.json ./
RUN npm cache clean --force
RUN npm install
COPY application .
EXPOSE 1337

CMD [ "npm", "start"]