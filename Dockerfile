FROM node
WORKDIR /usr/src/app
RUN npm install -g sails
COPY services/application/package*.json ./
RUN npm cache clean --force
RUN npm install
COPY services/application/. .
EXPOSE 1337

CMD [ "sails", "lift"]
