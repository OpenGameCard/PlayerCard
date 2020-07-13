FROM node
WORKDIR /usr/src/app
RUN npm install -g sails
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 1337

CMD [ "sails", "lift"]
